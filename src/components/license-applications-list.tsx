"use client";

import { useLicenseApplications } from "@/hooks/use-license-applications";
import { useState } from "react";
import { toast } from "sonner";

export const LicenseApplicationsList = () => {
  const [filters, setFilters] = useState({
    sort: "desc" as const,
    date_range: "2025-01-01,2027-01-01",
    type: "new",
    status: "applied",
    license_category_type: "State/Special SME's",
  });

  const { data, isLoading, error, refetch } = useLicenseApplications(filters);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading license applications...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">Error loading license applications</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data?.data?.license_applications?.length) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">No license applications found</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">License Applications</h2>
        <div className="text-sm text-gray-600">
          Total: {data.data.meta.total} applications
        </div>
      </div>

      <div className="space-y-4">
        {data.data.license_applications.map((application) => (
          <div
            key={application.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">
                  {application.owner.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Reference: {application.reference}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  application.status === "Pending Inspection"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {application.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Type:</span> {application.type}
              </div>
              <div>
                <span className="font-medium">Amount:</span>{" "}
                {application.amount}
              </div>
              <div>
                <span className="font-medium">Category:</span>{" "}
                {application.license_category.name}
              </div>
              <div>
                <span className="font-medium">Created:</span>{" "}
                {application.created_at}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t">
              <div className="text-sm">
                <span className="font-medium">Contact:</span>{" "}
                {application.owner.contact_person.first_name}{" "}
                {application.owner.contact_person.last_name}
              </div>
              <div className="text-sm text-gray-600">
                {application.owner.contact_person.email}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination info */}
      {data.data.meta.last_page > 1 && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Page {data.data.meta.current_page} of {data.data.meta.last_page}
        </div>
      )}
    </div>
  );
};
