"use client";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { Button } from "@/components/ui/button";

import { columns } from "./components/columns";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/empty-state";
import { LicenseInfo } from "@/components/license-info";
import { useLicenseApplications } from "@/hooks/use-license-applications";

const License = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch license applications
  const {
    data: licenseData,
    isLoading,
    error,
  } = useLicenseApplications({
    // sort: "desc",
    // date_range: "2025-01-01,2027-01-01",
    // per_page: 100,
    // page: currentPage,
  });

  // Transform license data to match the expected format
  const licenses =
    licenseData?.data?.license_applications?.map((license) => ({
      id: license.id,
      uuid: license.uuid,
      company_name: license.owner.name,
      company_email: license.owner.email,
      license_type: license.license_category.name,
      license_duration: "1 year", // Default duration since it's not in the API response
      status: license.status,
    })) || [];

  return (
    <main>
      <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5]">
        <div className="flex md:flex-row flex-col justify-between md:items-center gap-[14px]">
          <div className="flex flex-col gap-1 leading-[18px]">
            <h3 className="text-[22px] text-[#00081E] font-semibold leading-[26.4px]">
              License Requests
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
        {isLoading ? (
          <DataTableSkeleton
            rows={10}
            columns={5}
            tableName="History"
            tableDescription="View recent license purchased and renewal"
          />
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-red-600 mb-4">
              Error loading license applications
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        ) : licenses.length > 0 ? (
          <DataTable
            columns={columns}
            data={licenses}
            searchKey="company_name"
            tableName={`History`}
            tableDescription="View recent license purchased and renewal"
            onPageChange={(page: number) => setCurrentPage(page)}
            currentPage={currentPage}
            onRowClick={(row) => router.push(`/license/${row.uuid}`)}
          />
        ) : (
          <EmptyState title="No license applications found" />
        )}
      </div>
    </main>
  );
};

export default License;
