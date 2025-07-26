"use client";

import { useCouriersMock } from "@/hooks/use-couriers-mock";
import { useState } from "react";

export const CouriersList = () => {
  const [filters, setFilters] = useState({
    sort: "desc" as const,
    date_range: "2025-01-01,2027-01-01",
    per_page: 100,
    page: 1,
  });

  const { data, isLoading, error, refetch } = useCouriersMock(filters);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading courier companies...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">Error loading courier companies</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  const couriers = data?.data?.couriers || [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Courier Companies</h2>
        <div className="text-sm text-gray-600">
          Total: {data.data.meta.total} companies
        </div>
      </div>

      <div className="space-y-4">
        {couriers.map((courier) => (
          <div
            key={courier.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{courier.name}</h3>
                <p className="text-sm text-gray-600">
                  Reference: {courier.reference}
                </p>
              </div>
              <div className="flex gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    courier.activated
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {courier.activated ? "Activated" : "Pending"}
                </span>
                {courier.has_active_license_application && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Has License App
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Email:</span> {courier.email}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {courier.phone}
              </div>
              <div>
                <span className="font-medium">Registration:</span>{" "}
                {courier.registration_number}
              </div>
              <div>
                <span className="font-medium">Created:</span>{" "}
                {courier.created_at}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t">
              <div className="text-sm">
                <span className="font-medium">Contact Person:</span>{" "}
                {courier.contact_person.first_name}{" "}
                {courier.contact_person.last_name}
              </div>
              <div className="text-sm text-gray-600">
                {courier.contact_person.email} | {courier.contact_person.phone}
              </div>
            </div>

            {courier.profile && (
              <div className="mt-3 pt-3 border-t">
                <div className="text-sm">
                  <span className="font-medium">Business:</span>{" "}
                  {courier.profile.business_name}
                </div>
                <div className="text-sm text-gray-600">
                  {courier.profile.license_category.name} -{" "}
                  {courier.profile.state.name}
                </div>
              </div>
            )}
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
