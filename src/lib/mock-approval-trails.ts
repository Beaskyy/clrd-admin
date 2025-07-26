import { ApprovalTrail, ApprovalTrailsResponse } from "@/types/approval-trail";

export const mockApprovalTrails: ApprovalTrail[] = [
  {
    id: 1,
    uuid: "9f7c2018-4088-41c7-87e6-b76b47874d09",
    action: "Approved",
    comment:
      "Nam illum quo. Libero sint nam quis asperiores voluptates est magnam id sed. Nisi ut ut exercitationem nostrum doloremque aliquid minima. Autem id asperiores et dolore neque sed. Id eveniet pariatur temporibus consequatur. Praesentium nihil et voluptates qui reprehenderit exercitationem voluptatem est.",
    level: "Admin",
    admin: {
      id: 4,
      uuid: "9f75add7-af7a-40cc-b8ff-cce41faeba93",
      username: "ebiowei420",
      first_name: "Ebiowei",
      last_name: "Opeyemi",
      phone: "08092306042",
      email: "uabosede@example.org",
      address: "81 Sekinat Street 50076 RasheedahVille",
      email_verified_at: "Wed, Jul 23, 2025 2:36 PM",
      roles: ["admin"],
      permissions: [],
      created_at: "Wed, Jul 23, 2025 2:36 PM",
      updated_at: "3 days ago",
      deleted_at: null,
    },
    created_at: "Sat, Jul 26, 2025 7:30 PM",
    updated_at: "1 minute ago",
    deleted_at: null,
  },
  {
    id: 2,
    uuid: "9f7c2019-4088-41c7-87e6-b76b47874d10",
    action: "Requested More Info",
    comment:
      "Additional documentation required for verification. Please provide updated business registration documents.",
    level: "Reviewer",
    admin: {
      id: 5,
      uuid: "9f75add8-af7a-40cc-b8ff-cce41faeba94",
      username: "john_doe",
      first_name: "John",
      last_name: "Doe",
      phone: "08012345678",
      email: "john.doe@example.org",
      address: "123 Main Street, Lagos",
      email_verified_at: "Wed, Jul 23, 2025 2:36 PM",
      roles: ["reviewer"],
      permissions: [],
      created_at: "Wed, Jul 23, 2025 2:36 PM",
      updated_at: "3 days ago",
      deleted_at: null,
    },
    created_at: "Sat, Jul 26, 2025 6:15 PM",
    updated_at: "2 hours ago",
    deleted_at: null,
  },
];

export const mockApprovalTrailsResponse: ApprovalTrailsResponse = {
  status: "success",
  message: "Approval trails retrieved successfully.",
  data: mockApprovalTrails,
};
