export interface PaymentLog {
  provider: string;
  reference: string;
  card: string[];
}

export interface Transaction {
  id: number;
  uuid: string;
  reference: string;
  category: string;
  type: "debit" | "credit";
  amount: string;
  cleared_amount: string;
  narration: string;
  paymentLog: PaymentLog;
  creator: string[];
  status: "success" | "pending" | "failed";
  created_at: string;
  updated_at: string;
}

export interface TransactionResponse {
  status: string;
  message: string;
  data: {
    meta: {
      total: number;
      per_page: number;
      current_page: number;
      last_page: number;
      first_page_url: string;
      last_page_url: string;
      next_page_url: string | null;
      prev_page_url: string | null;
      path: string;
      from: number;
      to: number;
    };
    transactions: Transaction[];
  };
}

export interface TransactionParams {
  sort?: "asc" | "desc";
  date_range?: string;
  status?: string; // Can be comma-separated: "success,pending,failed"
  category?: string;
  search?: string;
  type?: "debit" | "credit";
  page?: number;
  per_page?: number;
}
