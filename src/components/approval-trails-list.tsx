"use client";

import { useApprovalTrailsMock } from "@/hooks/use-approval-trails-mock";
import { format } from "date-fns";

interface ApprovalTrailsListProps {
  licenseUuid: string;
}

export const ApprovalTrailsList = ({
  licenseUuid,
}: ApprovalTrailsListProps) => {
  const { data, isLoading, error, refetch } =
    useApprovalTrailsMock(licenseUuid);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading approval trails...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">Error loading approval trails</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">No approval trails found</p>
      </div>
    );
  }

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "requested more info":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Approval History
      </h3>

      <div className="space-y-4">
        {data.data.map((trail) => (
          <div key={trail.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getActionColor(
                    trail.action
                  )}`}
                >
                  {trail.action}
                </span>
                <span className="text-sm text-gray-500">
                  Level: {trail.level}
                </span>
              </div>
              <span className="text-sm text-gray-500">{trail.created_at}</span>
            </div>

            <div className="mb-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                {trail.comment}
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-700">
                    {trail.admin.first_name.charAt(0)}
                    {trail.admin.last_name.charAt(0)}
                  </span>
                </div>
                <span>
                  {trail.admin.first_name} {trail.admin.last_name}
                </span>
              </div>
              <span>•</span>
              <span>{trail.admin.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
