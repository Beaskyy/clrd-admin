import Image from "next/image";

export const LicenseInfo = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-[18px]">
      <div className="p-4 bg-white border border-[#F1F1F1] rounded-lg h-[100px]">
        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-[#667085] font-medium">Total License requests</p>
            <p className="text-[32px] text-[#101828] font-semibold leading-[38px]">
              0
            </p>
          </div>
          <Image src="/images/icon-1.svg" alt="icon-1" width={40} height={40} />
        </div>
      </div>
      <div className="p-4 bg-white border border-[#F1F1F1] rounded-lg h-[100px]">
        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-[#667085] font-medium">Pending License approval</p>
            <p className="text-[32px] text-[#101828] font-semibold leading-[38px]">
              0
            </p>
          </div>
          <Image src="/images/icon.svg" alt="icon" width={40} height={40} />
        </div>
      </div>
    </div>
  );
};
