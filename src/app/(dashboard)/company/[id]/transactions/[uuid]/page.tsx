"use client";

import { useParams, useRouter } from "next/navigation";
import { useTransactionDetail } from "@/hooks/use-transaction-detail";
import { ChevronLeft } from "lucide-react";
import { DetailPageSkeleton } from "@/components/detail-page-skeleton";

export default function TransactionDetails() {
  const router = useRouter();
  const params = useParams();
  const courierId = parseInt(params.id as string);
  const transactionUuid = params.uuid as string;

  // Fetch transaction details using the hook
  const { data, isLoading, error } = useTransactionDetail(
    courierId,
    transactionUuid
  );
  const transaction = data?.data;

  if (isLoading) {
    return <DetailPageSkeleton sections={3} cardsPerSection={3} />;
  }

  if (error || !transaction) {
    return (
      <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5]">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#101828] mb-4">
            Transaction Not Found
          </h2>
          <p className="text-[#667085]">
            The transaction you&apos;re looking for doesn&apos;t exist or there
            was an error loading the data.
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "debit":
        return "bg-red-100 text-red-800";
      case "credit":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="flex flex-col gap-4 bg-[#f5f5f5] pt-8 min-h-[calc(100vh-66px)]">
      <div
        onClick={() => router.back()}
        className="flex items-center gap-1 border w-[98px] h-[38px] p-2.5 pl-1.5 bg-white border-[#F0F2F4] rounded-[40px] text-sm text-[#344054] font-medium whitespace-nowrap hover:shadow-sm cursor-pointer lg:ml-9 ml-5"
      >
        <ChevronLeft className="size-[18px]" />
        <span>Go Back</span>
      </div>

      <div className="flex flex-col gap-6 md:p-9 p-5 bg-[#F5F5F5]">
        {/* Transaction Details */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-1 mb-4">
            <div className="flex flex-col">
              <p className="text-base text-[#101828] font-semibold tracking-[0.1%]">
                Transaction Details
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Reference
              </label>
              <p className="lg:text-base text-sm font-medium text-[#101828] font-mono">
                {transaction.reference}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Category
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {transaction.category}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">Type</label>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                    transaction.type
                  )}`}
                >
                  {transaction.type}
                </span>
              </div>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Amount
              </label>
              <p className="lg:text-base text-sm font-bold text-[#101828]">
                ₦{transaction.amount}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Cleared Amount
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                ₦{transaction.cleared_amount}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Status
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    transaction.status
                  )}`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Created At
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {transaction.created_at}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Updated At
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {transaction.updated_at}
              </p>
            </div>
          </div>
        </div>

        {/* Narration */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-1 mb-4">
            <div className="flex flex-col">
              <p className="text-base text-[#101828] font-semibold tracking-[0.1%]">
                Transaction Description
              </p>
            </div>
          </div>
          <div>
            <p className="text-base text-[#101828] leading-relaxed">
              {transaction.narration}
            </p>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-1 mb-4">
            <div className="flex flex-col">
              <p className="text-base text-[#101828] font-semibold tracking-[0.1%]">
                Payment Information
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Payment Provider
              </label>
              <p className="lg:text-base text-sm text-[#101828] capitalize">
                {transaction.paymentLog.provider}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Payment Reference
              </label>
              <p className="lg:text-base text-sm text-[#101828] font-mono">
                {transaction.paymentLog.reference}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
