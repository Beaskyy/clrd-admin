import { useQuery } from "@tanstack/react-query";
import { TransactionResponse, TransactionParams } from "@/types/transaction";
import { useSession } from "next-auth/react";

const fetchTransactions = async (
  params: TransactionParams,
  accessToken?: string
): Promise<TransactionResponse> => {
  const searchParams = new URLSearchParams();

  // Add parameters to search params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });

  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/admin/transactions?${searchParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions: ${response.statusText}`);
  }

  return response.json();
};

export const useTransactions = (params: TransactionParams = {}) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["transactions", params],
    queryFn: () => fetchTransactions(params, session?.accessToken),
    enabled: !!session?.accessToken, // Only fetch when user is authenticated
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep data in cache for 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors
      if (error instanceof Error && error.message.includes("401")) return false;
      if (error instanceof Error && error.message.includes("403")) return false;
      return failureCount < 3;
    },
  });
};
