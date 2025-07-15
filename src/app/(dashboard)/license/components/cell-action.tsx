
import { useRouter } from "next/navigation";
import { LicenseColumn } from "./columns";


interface CellActionProps {
  data: LicenseColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();


  return (
    <div className="flex justify-center items-center cursor-pointer border border-[#EAECF0] h-10 w-[140px] rounded-lg py-2.5 px-3.5 text-sm text-[#344054]" onClick={() => router.push(`/license/${data.id}`)}>
      View documents
    </div>
  );
};
