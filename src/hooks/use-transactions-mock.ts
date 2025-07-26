import { useQuery } from "@tanstack/react-query";
import { TransactionResponse, TransactionParams } from "@/types/transaction";
import { mockTransactionResponse } from "@/lib/mock-transactions";

// Mock fetch function that returns the mock data
const fetchMockTransactions = async (
  params: TransactionParams
): Promise<TransactionResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Filter mock data based on params if needed
  let filteredTransactions = mockTransactionResponse.data.transactions;

  if (params.status) {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.status === params.status
    );
  }

  if (params.payment_name) {
    filteredTransactions = filteredTransactions.filter((t) =>
      t.payment_name.toLowerCase().includes(params.payment_name!.toLowerCase())
    );
  }

  return {
    ...mockTransactionResponse,
    data: {
      ...mockTransactionResponse.data,
      transactions: filteredTransactions,
      meta: {
        ...mockTransactionResponse.data.meta,
        total: filteredTransactions.length,
        to: filteredTransactions.length,
      },
    },
  };
};

export const useTransactionsMock = (params: TransactionParams = {}) => {
  return useQuery({
    queryKey: ["transactions-mock", params],
    queryFn: () => fetchMockTransactions(params),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep data in cache for 10 minutes
  });
};
