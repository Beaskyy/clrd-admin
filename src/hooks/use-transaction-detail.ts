import { useQuery } from "@tanstack/react-query";
import { TransactionDetailResponse } from "@/types/transaction-detail";
import { useSession } from "next-auth/react";
import { createApiRequest } from "@/lib/api-utils";

const fetchTransactionDetail = async (
  courierId: number,
  transactionUuid: string,
  accessToken?: string
): Promise<TransactionDetailResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/couriers/${courierId}/transactions/${transactionUuid}`;

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

export const useTransactionDetail = (
  courierId: number,
  transactionUuid: string
) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["transaction-detail", courierId, transactionUuid],
    queryFn: () =>
      fetchTransactionDetail(
        courierId,
        transactionUuid,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (session as any)?.accessToken
      ),
    enabled:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !!(session as any)?.accessToken && !!courierId && !!transactionUuid, // Only fetch when user is authenticated and both IDs are provided
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep data in cache for 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors
      if (error instanceof Error && error.message.includes("401")) return false;
      if (error instanceof Error && error.message.includes("403")) return false;
      if (error instanceof Error && error.message.includes("404")) return false; // Don't retry if transaction not found
      return failureCount < 3;
    },
  });
};
