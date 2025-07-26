"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TransactionColumn = {
  id: number;
  payment_name: string;
  transaction_id: string;
  amount_paid: string;
  status: "success" | "pending" | "failed";
  date_added: string;
};

export const columns: ColumnDef<TransactionColumn>[] = [
  {
    accessorKey: "payment_name",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Payment Name
      </div>
    ),
  },
  {
    accessorKey: "transaction_id",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Transaction ID
      </div>
    ),
  },
  {
    accessorKey: "amount_paid",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Amount Paid
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
    accessorKey: "date_added",
    header: ({ column }) => (
      <div
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1 cursor-pointer"
      >
        Date Added
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
