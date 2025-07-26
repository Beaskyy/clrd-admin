export interface Transaction {
  id: number;
  payment_name: string;
  transaction_id: string;
  amount_paid: string;
  status: "success" | "pending" | "failed";
  date_added: string;
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
  status?: "success" | "pending" | "failed";
  payment_name?: string;
  page?: number;
  per_page?: number;
}
