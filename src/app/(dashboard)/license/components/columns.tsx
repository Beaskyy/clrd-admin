"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type LicenseColumn = {
  id: number;
  company_name: string;
  company_email: string;
  license_type: string;
  license_duration: string;
  status: string;
};

export const columns: ColumnDef<LicenseColumn>[] = [
  {
    accessorKey: "company_name",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Company name
      </div>
    ),
  },
  {
    accessorKey: "company_email",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Company email
      </div>
    ),
  },
  {
    accessorKey: "license_type",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        License type
      </div>
    ),
  },
  {
    accessorKey: "license_duration",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        License duration
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Status
      </div>
    ),
    cell: (info) => {
      const status = info.getValue() as string;
      const isApproved = status.toLowerCase() === "approved";
      const statusStyle = isApproved
        ? { color: "#027A48", backgroundColor: "#ECFDF3" }
        : { color: "#E7B114", backgroundColor: "#FFF8EF" };
      return (
        <div
          style={statusStyle}
          className="flex justify-center items-center gap-2 py-1 pr-4 pl-3 rounded-[20px] text-sm font-medium w-fit capitalize"
        >
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
