export interface PaymentLog {
  provider: string;
  reference: string;
  card: string[];
}

export interface TransactionDetail {
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

export interface TransactionDetailResponse {
  status: string;
  message: string;
  data: TransactionDetail;
}
