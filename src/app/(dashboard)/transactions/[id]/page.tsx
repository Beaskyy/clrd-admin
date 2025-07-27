"use client";

import { DashboardInfo } from "@/components/dashboard-info";
import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { useState, use } from "react";
import { columns } from "../components/columns";
import { useRouter } from "next/navigation";
import { useTransactions } from "@/hooks/use-transactions";
import { useSession } from "next-auth/react";

export default function Transactions({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const resolvedParams = use(params);
  const courierId = parseInt(resolvedParams.id);

  // Fetch transactions for the specific courier
  const {
    data: transactionsData,
    isLoading,
    error,
  } = useTransactions(courierId, {
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

  return (
    <main>
      <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5]">
        <div className="flex flex-col gap-1">
          <h3 className="text-[22px] text-[#00081E] font-semibold leading-[26.4px]">
            Welcome, {session?.user?.name || "User"} 👋
          </h3>
          <h6 className="text-base text-[#475367] leading-[23.2px]">
            What are you getting done today
          </h6>
        </div>
        <DashboardInfo />
        {isLoading ? (
          <DataTableSkeleton
            rows={10}
            columns={6}
            tableName="Transaction history"
            tableDescription="View recent payments made and their status"
          />
        ) : error ? (
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
            onRowClick={(row) => router.push(`/company/${row.id}`)}
          />
        )}
      </div>
    </main>
  );
}
