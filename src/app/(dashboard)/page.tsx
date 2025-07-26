"use client";

import { DashboardInfo } from "@/components/dashboard-info";
import { DataTable } from "@/components/data-table";
import { useState } from "react";
import { columns } from "./components/columns";
import { useRouter } from "next/navigation";
import { useCouriers } from "@/hooks/use-couriers";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch courier companies
  const {
    data: couriersData,
    isLoading,
    error,
  } = useCouriers({
    sort: "desc",
    date_range: "2025-01-01,2027-01-01",
    per_page: 100,
    page: currentPage,
  });

  // Transform courier data to match the expected format
  const couriers =
    couriersData?.data?.couriers?.map((courier) => ({
      id: courier.id,
      uuid: courier.uuid,
      company_name: courier.name,
      company_email: courier.email,
      contact_phone: courier.phone,
      status: courier.activated ? "Activated" : "Pending",
      date_requested: courier.created_at,
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
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Loading courier companies...</span>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-600 mb-4">Error loading courier companies</p>
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
            data={couriers}
            searchKey="company_name"
            tableName={`Recent applications`}
            tableDescription="View recent courier companies and their status"
            onPageChange={(page: number) => setCurrentPage(page)}
            currentPage={currentPage}
            onRowClick={(row) => router.push(`/company/${row.uuid}`)}
          />
        )}
      </div>
    </main>
  );
}
