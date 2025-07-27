"use client";

import { useParams } from "next/navigation";
import { useCourierDetail } from "@/hooks/use-courier-detail";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { DetailPageSkeleton } from "@/components/detail-page-skeleton";
import { columns } from "../../transactions/components/columns";
import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { useState } from "react";
import { useTransactions } from "@/hooks/use-transactions";

export default function CompanyDetails() {
  const router = useRouter();
  const params = useParams();
  const courierUuid = params.id as string;
  const [currentPage, setCurrentPage] = useState(1);
  // Fetch courier details using the hook
  const { data, isLoading, error } = useCourierDetail(courierUuid);
  const courier = data?.data;

  // Fetch transactions for the specific courier
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useTransactions(courier?.id || 0, {
    per_page: 100,
    page: currentPage,
    sort: "desc",
    status: "success,pending,failed",
  });

  // Transform transaction data to match the expected format
  const transactions =
    transactionsData?.data?.transactions?.map((transaction) => ({
      id: transaction.id,
      uuid: transaction.uuid,
      reference: transaction.reference,
      category: transaction.category,
      type: transaction.type,
      amount: transaction.amount,
      status: transaction.status,
      created_at: transaction.created_at,
    })) || [];

  if (isLoading) {
    return <DetailPageSkeleton sections={5} cardsPerSection={3} />;
  }

  if (error || !courier) {
    return (
      <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5]">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#101828] mb-4">
            Courier Not Found
          </h2>
          <p className="text-[#667085]">
            The courier you&apos;re looking for doesn&apos;t exist or there was
            an error loading the data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-4 bg-[#f5f5f5] pt-8 min-h-[calc(100vh-66px)]">
      <div
        onClick={() => router.back()}
        className="flex items-center gap-1 border w-[98px] h-[38px] p-2.5 pl-1.5 bg-white border-[#F0F2F4] rounded-[40px] text-sm text-[#344054] font-medium whitespace-nowrap hover:shadow-sm cursor-pointe lg:ml-9 ml-5 cursor-pointer"
      >
        <ChevronLeft className="size-[18px]" />
        <span>Go Back</span>
      </div>
      <div className="flex flex-col gap-6 md:p-9 p-5 bg-[#F5F5F5]">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center  border-b border-[#F3F4F6] pb-1 mb-4">
            <div className="flex flex-col">
              <p className="text-base text-[#101828] font-semibold tracking-[0.1%]">
                Company details
              </p>
            </div>

            {/* <Popover>
              <PopoverTrigger>
                <Ellipsis className="size-[20px] text-[#344054] cursor-pointer" />
              </PopoverTrigger>

              <PopoverContent className="shadow-md w-[274px] rounded-lg border border-[#F2F4F7] p-0 lg:mr-9">
                <div className="py-3 px-4 border-b border-[#EAECF0] text-sm font-semibold text-[#344054]">
                  More
                </div>
                <div className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer">
                  <Image
                    src="/images/file.svg"
                    alt="file"
                    width={20}
                    height={20}
                  />
                  <div className="text-sm font-medium text-[#344054]">
                    See more details
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer">
                  <Image
                    src="/images/coin-stack.svg"
                    alt="coin-stack"
                    width={20}
                    height={20}
                  />
                  <div className="text-sm font-medium text-[#344054]">
                    Approve
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer">
                  <Image
                    src="/images/ban.svg"
                    alt="ban"
                    width={20}
                    height={20}
                  />
                  <div className="text-sm font-medium text-[#344054]">
                    Reject application
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer">
                  <Image
                    src="/images/file-dots.svg"
                    alt="file-dots"
                    width={20}
                    height={20}
                  />
                  <div className="text-sm font-medium text-[#344054]">
                    Request additional information
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer">
                  <Image
                    src="/images/file-dots.svg"
                    alt="file-dots"
                    width={20}
                    height={20}
                  />
                  <div className="text-sm font-medium text-[#344054]">
                    See transaction history
                  </div>
                </div>
              </PopoverContent>
            </Popover> */}
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Company Name
              </label>
              <p className="lg:text-base text-sm font-medium text-[#101828]">
                {courier.name}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">Email</label>
              <p className="lg:text-base text-sm text-[#101828]">
                {courier.email}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">Phone</label>
              <p className="lg:text-base text-sm text-[#101828]">
                {courier.phone}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Status
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    courier.activated
                      ? "bg-[#ECFDF3] text-[#027A48]"
                      : "bg-[#FFF8EF] text-[#E7B114]"
                  }`}
                >
                  {courier.activated ? "Activated" : "Pending"}
                </span>
              </div>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Date Created
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {courier.created_at}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-1 mb-4">
            <div className="flex flex-col">
              <p className="text-base text-[#101828] font-semibold tracking-[0.1%]">
                Profile Details
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Applicant Name
              </label>
              <p className="lg:text-base text-sm font-medium text-[#101828]">
                {courier.profile.applicant_name}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Applicant Position
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {courier.profile.applicant_position}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Business Name
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {courier.profile.business_name}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                CAC Number
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {courier.profile.cac_number}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Address
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {courier.profile.address}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                License Category
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {courier.profile.license_category.name}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">State</label>
              <p className="lg:text-base text-sm text-[#101828]">
                {courier.profile.state.name}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                License Price
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                ₦{courier.profile.license_category.price}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Renewal Price
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                ₦{courier.profile.license_category.renewal_price}
              </p>
            </div>
          </div>
        </div>

          {transactionsLoading ? (
            <DataTableSkeleton
              rows={10}
              columns={6}
              tableName="Transaction history"
              tableDescription="View recent payments made and their status"
            />
          ) : transactionsError ? (
            <div className="p-8 text-center">
              <p className="text-red-600 mb-4">Error loading transactions</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={transactions}
              searchKey="reference"
              tableName="Transaction history"
              tableDescription="View recent payments made and their status"
              onPageChange={(page: number) => setCurrentPage(page)}
              currentPage={currentPage}
              showFilter={false}
              onRowClick={(row) =>
                router.push(
                  `/company/${courier.id}/transactions/${row.uuid}`
                )
              }
            />
          )}
        </div>
    </main>
  );
}
