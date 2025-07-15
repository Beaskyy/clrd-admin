"use client";

import { useRouter } from "next/navigation";
import { CompanyColumn } from "./columns";

interface CellActionProps {
  data: CompanyColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();

  return (
    <div
      className="flex justify-center items-center cursor-pointer border border-[#EAECF0] h-10 rounded-lg py-2.5 px-3.5 text-sm text-[#344054]"
      onClick={() => router.push(`/license/${data.id}`)}
    >
      View more
    </div>
  );
};
