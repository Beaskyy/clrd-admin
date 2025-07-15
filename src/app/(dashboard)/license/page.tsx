"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";

import { licenses } from "@/lib/data";
import { columns } from "./components/columns";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { LicenseInfo } from "@/components/license-info";

const License = () => {
  const router = useRouter();
  const approvalStatus = "approved";
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main>
      <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5]">
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-[14px]">
          <div className="flex flex-col gap-1 leading-[18px]">
            <h3 className="text-[22px] text-[#00081E] font-semibold leading-[26.4px]">
              License approval
            </h3>
            <h6 className="text-base text-[#475367] leading-[23.2px]">
              What are you getting done today
            </h6>
          </div>

          <Button
            className="w-fit rounded-full h-10 font-sm font-medium"
            onClick={() => router.push("/license-activation")}
          >
           Generate report
          </Button>
        </div>
        <LicenseInfo />
        {approvalStatus === "approved" ? (
          <DataTable
            columns={columns}
            data={licenses}
            searchKey="name"
            tableName={`History`}
            tableDescription="View recent license purchased and renewal"
            onPageChange={(page: number) => setCurrentPage(page)}
            currentPage={currentPage}
          />
        ) : (
          <EmptyState title="No request made yet" />
        )}
      </div>
    </main>
  );
};

export default License;
