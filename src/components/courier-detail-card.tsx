"use client";

import { useCourierDetailMock } from "@/hooks/use-courier-detail-mock";

interface CourierDetailCardProps {
  courierUuid: string;
}

export const CourierDetailCard = ({ courierUuid }: CourierDetailCardProps) => {
  const { data, isLoading, error, refetch } = useCourierDetailMock(courierUuid);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading courier details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">Error loading courier details</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">No courier details found</p>
      </div>
    );
  }

  const courier = data.data;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {courier.name}
        </h2>
        <p className="text-gray-600">Reference: {courier.reference}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Basic Information
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Email:</span>
              <p className="text-gray-900">{courier.email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Phone:</span>
              <p className="text-gray-900">{courier.phone}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Address:
              </span>
              <p className="text-gray-900">{courier.address}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Registration Number:
              </span>
              <p className="text-gray-900">{courier.registration_number}</p>
            </div>
          </div>
        </div>

        {/* Contact Person */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Contact Person
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Name:</span>
              <p className="text-gray-900">
                {courier.contact_person.first_name}{" "}
                {courier.contact_person.last_name}
              </p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Email:</span>
              <p className="text-gray-900">{courier.contact_person.email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Phone:</span>
              <p className="text-gray-900">{courier.contact_person.phone}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                Address:
              </span>
              <p className="text-gray-900">{courier.contact_person.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      {courier.profile && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Business Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Business Name:
                </span>
                <p className="text-gray-900">{courier.profile.business_name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Applicant Name:
                </span>
                <p className="text-gray-900">
                  {courier.profile.applicant_name}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Position:
                </span>
                <p className="text-gray-900">
                  {courier.profile.applicant_position}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  CAC Number:
                </span>
                <p className="text-gray-900">{courier.profile.cac_number}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  License Category:
                </span>
                <p className="text-gray-900">
                  {courier.profile.license_category.name}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  State:
                </span>
                <p className="text-gray-900">
                  {courier.profile.state.name} (
                  {courier.profile.state.short_name})
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  License Price:
                </span>
                <p className="text-gray-900">
                  ₦{courier.profile.license_category.price}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Renewal Price:
                </span>
                <p className="text-gray-900">
                  ₦{courier.profile.license_category.renewal_price}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Information */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Status Information
        </h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                courier.activated
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {courier.activated ? "Activated" : "Pending Activation"}
            </span>
          </div>
          {courier.has_active_license_application && (
            <div className="flex items-center gap-2">
              <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                Has Active License Application
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Users:</span>
            <span className="text-sm font-medium text-gray-900">
              {courier.users_count}
            </span>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>Created: {courier.created_at}</p>
          <p>Last Updated: {courier.updated_at}</p>
          {courier.activated_at && <p>Activated: {courier.activated_at}</p>}
        </div>
      </div>
    </div>
  );
};
