"use client";

import { useState } from "react";

interface StaffMember {
  id: number;
  role: string;
  staff_name: string;
  phone_number: string;
  privilege: string;
}

const mockStaffData: StaffMember[] = [
  {
    id: 1,
    role: "Administrator 1",
    staff_name: "Adeola Joseph",
    phone_number: "+234 814 4939 493",
    privilege: "Final Approval",
  },
  {
    id: 2,
    role: "Administrator 2",
    staff_name: "Durin Dustin",
    phone_number: "+234 814 4939 493",
    privilege: "Cannot Approve",
  },
];

const getPrivilegeStyle = (privilege: string) => {
  switch (privilege) {
    case "Final Approval":
      return "bg-green-50 text-green-700 border-green-200";
    case "Cannot Approve":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getActionButton = (privilege: string, staffId: number) => {
  if (privilege === "Final Approval") {
    return (
      <button
        onClick={() => handleRevokePrivilege(staffId)}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Revoke Privilege
      </button>
    );
  } else {
    return (
      <button
        onClick={() => handleGivePermission(staffId)}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Give Permission for Approval
      </button>
    );
  }
};

const handleRevokePrivilege = (staffId: number) => {
  console.log("Revoking privilege for staff ID:", staffId);
  // Add your logic here
};

const handleGivePermission = (staffId: number) => {
  console.log("Giving permission for staff ID:", staffId);
  // Add your logic here
};

export default function RolesAndPrivileges() {
  const [staffData] = useState<StaffMember[]>(mockStaffData);

  return (
    <main>
      <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5] min-h-[calc(100vh-66px)]">
        <div className="flex flex-col gap-1">
          <h3 className="text-[22px] text-[#00081E] font-semibold leading-[26.4px]">
            Roles and Privileges
          </h3>
          <h6 className="text-base text-[#475367] leading-[23.2px]">
            Manage staff roles and permissions
          </h6>
        </div>

        {/* Custom Table */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-xl">
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full divide-y divide-gray-200 rounded-xl">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Staff name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Privilege
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staffData.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {staff.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {staff.staff_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {staff.phone_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getPrivilegeStyle(
                          staff.privilege
                        )}`}
                      >
                        {staff.privilege}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getActionButton(staff.privilege, staff.id)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {staffData.length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500">
              No staff members found
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
