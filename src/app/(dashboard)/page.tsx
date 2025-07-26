"use client";

import { DashboardInfo } from "@/components/dashboard-info";
import { DataTable } from "@/components/data-table";
import { companies } from "@/lib/data";
import { useState } from "react";
import { columns } from "./components/columns";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const user = JSON?.parse(localStorage.getItem("user") || "{}");
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <main>
      <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5]">
        <div className="flex flex-col gap-1">
          <h3 className="text-[22px] text-[#00081E] font-semibold leading-[26.4px]">
            Welcome, {user?.first_name} 👋
          </h3>
          <h6 className="text-base text-[#475367] leading-[23.2px]">
            What are you getting done today
          </h6>
        </div>
        <DashboardInfo />
        <DataTable
          columns={columns}
          data={companies}
          searchKey="name"
          tableName={`Recent applications`}
          tableDescription="View recent payments made and their status"
          onPageChange={(page: number) => setCurrentPage(page)}
          currentPage={currentPage}
          onRowClick={(row) => router.push(`/company/${row.id}`)}
        />
      </div>
    </main>
  );
}
