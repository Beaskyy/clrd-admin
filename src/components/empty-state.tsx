import Image from "next/image";

export const EmptyState = ({ title }: { title: string }) => {
  return (
    <div
      className="bg-white border border-[#F1F1F1] rounded-lg"
      style={{
        boxShadow: "0px 1px 2px 0px #1018280F",
      }}
    >
      <div className="flex justify-center items-center py-[100px] px-2.5 md:h-[626px]">
        <div className="flex flex-col items-center justify-center gap-[17.26px]">
          <Image src="/images/mask.svg" alt="Mask" width={120} height={120} />
          <p className="max-w-[192px] text-center text-base text-[#111827] leading-6">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};
