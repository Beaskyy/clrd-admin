import { useQuery } from "@tanstack/react-query";
import { TransactionResponse, TransactionParams } from "@/types/transaction";
import { useSession } from "next-auth/react";
import { createApiRequest } from "@/lib/api-utils";

const fetchTransactions = async (
  courierId: number,
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
  }/admin/couriers/${courierId}/transactions?${searchParams.toString()}`;

  const response = await createApiRequest(url, {
    method: "GET",
    accessToken,
  });

  if (!response) {
    // Response is null when 401 redirect happens
    throw new Error("Unauthorized");
  }

  return response.json();
};

export const useTransactions = (
  courierId: number,
  params: TransactionParams = {}
) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["transactions", courierId, params],
    queryFn: () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchTransactions(courierId, params, (session as any)?.accessToken),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    enabled: !!(session as any)?.accessToken && !!courierId, // Only fetch when user is authenticated and courierId is provided
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
