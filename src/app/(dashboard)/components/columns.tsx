"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type CompanyColumn = {
  id: number;
  company_name: string;
  company_email: string;
  contact_phone: string;
  status: string;
  date_requested: string;
};

export const columns: ColumnDef<CompanyColumn>[] = [
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
    accessorKey: "contact_phone",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Contact phone
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
    accessorKey: "date_requested",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Date requested
      </div>
    ),
  },
  {
    id: "actions",
    accessorKey: "Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
