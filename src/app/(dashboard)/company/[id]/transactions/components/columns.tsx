"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TransactionColumn = {
  id: number;
  uuid: string;
  reference: string;
  category: string;
  type: "debit" | "credit";
  amount: string;
  status: "success" | "pending" | "failed";
  created_at: string;
};

export const columns: ColumnDef<TransactionColumn>[] = [
  {
    accessorKey: "reference",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Reference
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Category
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Type
      </div>
    ),
    cell: (info) => {
      const type = info.getValue() as string;
      const getTypeStyle = (type: string) => {
        switch (type.toLowerCase()) {
          case "debit":
            return { color: "#D92D20", backgroundColor: "#FEF3F2" };
          case "credit":
            return { color: "#027A48", backgroundColor: "#ECFDF3" };
          default:
            return { color: "#667085", backgroundColor: "#F9FAFB" };
        }
      };

      const typeStyle = getTypeStyle(type);

      return (
        <div
          style={typeStyle}
          className="flex justify-center items-center gap-2 py-1 pr-4 pl-3 rounded-[20px] text-sm font-medium w-fit capitalize"
        >
          <span>{type}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Amount
      </div>
    ),
    cell: (info) => {
      const amount = info.getValue() as string;
      return `₦${amount}`;
    },
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
      const getStatusStyle = (status: string) => {
        switch (status.toLowerCase()) {
          case "success":
            return { color: "#027A48", backgroundColor: "#ECFDF3" };
          case "pending":
            return { color: "#E7B114", backgroundColor: "#FFF8EF" };
          case "failed":
            return { color: "#D92D20", backgroundColor: "#FEF3F2" };
          default:
            return { color: "#667085", backgroundColor: "#F9FAFB" };
        }
      };

      const statusStyle = getStatusStyle(status);

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
    accessorKey: "created_at",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Date Created
      </div>
    ),
    cell: (info) => {
      const date = info.getValue() as string;
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    },
  },
];
