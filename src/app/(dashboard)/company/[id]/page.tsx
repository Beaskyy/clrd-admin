"use client";

import { useParams } from "next/navigation";
import { useCourierDetail } from "@/hooks/use-courier-detail";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";


export default function CompanyDetails() {
  const router = useRouter();
  const params = useParams();
  const courierUuid = params.id as string;

  // Fetch courier details using the hook
  const { data, isLoading, error } = useCourierDetail(courierUuid);
  const courier = data?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5]">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Loading courier details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !courier) {
    return (
      <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5]">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#101828] mb-4">
            Courier Not Found
          </h2>
          <p className="text-[#667085]">
            The courier you&apos;re looking for doesn&apos;t exist or there was
            an error loading the data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-4 bg-[#f5f5f5] pt-8 min-h-[calc(100vh-66px)]">
      <div
        onClick={() => router.back()}
        className="flex items-center gap-1 border w-[98px] h-[38px] p-2.5 pl-1.5 bg-white border-[#F0F2F4] rounded-[40px] text-sm text-[#344054] font-medium whitespace-nowrap hover:shadow-sm cursor-pointe lg:ml-9 ml-5 cursor-pointer"
      >
        <ChevronLeft className="size-[18px]" />
        <span>Go Back</span>
      </div>
      <div className="flex flex-col gap-6 md:p-9 p-5 bg-[#F5F5F5]">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center  border-b border-[#F3F4F6] pb-1 mb-4">
            <div className="flex flex-col">
              <p className="text-base text-[#101828] font-semibold tracking-[0.1%]">
                Company details
              </p>
            </div>

            {/* <Popover>
              <PopoverTrigger>
                <Ellipsis className="size-[20px] text-[#344054] cursor-pointer" />
              </PopoverTrigger>

              <PopoverContent className="shadow-md w-[274px] rounded-lg border border-[#F2F4F7] p-0 lg:mr-9">
                <div className="py-3 px-4 border-b border-[#EAECF0] text-sm font-semibold text-[#344054]">
                  More
                </div>
                <div className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer">
                  <Image
                    src="/images/file.svg"
                    alt="file"
                    width={20}
                    height={20}
                  />
                  <div className="text-sm font-medium text-[#344054]">
                    See more details
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer">
                  <Image
                    src="/images/coin-stack.svg"
                    alt="coin-stack"
                    width={20}
                    height={20}
                  />
                  <div className="text-sm font-medium text-[#344054]">
                    Approve
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer">
                  <Image
                    src="/images/ban.svg"
                    alt="ban"
                    width={20}
                    height={20}
                  />
                  <div className="text-sm font-medium text-[#344054]">
                    Reject application
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer">
                  <Image
                    src="/images/file-dots.svg"
                    alt="file-dots"
                    width={20}
                    height={20}
                  />
                  <div className="text-sm font-medium text-[#344054]">
                    Request additional information
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer">
                  <Image
                    src="/images/file-dots.svg"
                    alt="file-dots"
                    width={20}
                    height={20}
                  />
                  <div className="text-sm font-medium text-[#344054]">
                    See transaction history
                  </div>
                </div>
              </PopoverContent>
            </Popover> */}
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Company Name
              </label>
              <p className="lg:text-base text-sm font-medium text-[#101828]">
                {courier.name}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">Email</label>
              <p className="lg:text-base text-sm text-[#101828]">
                {courier.email}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">Phone</label>
              <p className="lg:text-base text-sm text-[#101828]">
                {courier.phone}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Status
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    courier.activated
                      ? "bg-[#ECFDF3] text-[#027A48]"
                      : "bg-[#FFF8EF] text-[#E7B114]"
                  }`}
                >
                  {courier.activated ? "Activated" : "Pending"}
                </span>
              </div>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Date Created
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {courier.created_at}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center  border-b border-[#F3F4F6] pb-1 mb-4">
            <div className="flex flex-col">
              <p className="text-base text-[#101828] font-semibold tracking-[0.1%]">
                Company Documents
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1">
                  <Image
                    src="/images/file-icon.svg"
                    alt="file-icon"
                    width={32}
                    height={32}
                  />
                  <p className="text-sm font-medium text-[#171717]">
                    Tenancy Document
                  </p>
                </div>
                <div className="flex justify-center items-center border border-[#F3F4F6] shadow-sm  py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]">
                  View
                </div>
              </div>
            </div>
            <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1">
                  <Image
                    src="/images/file-icon.svg"
                    alt="file-icon"
                    width={32}
                    height={32}
                  />
                  <p className="text-sm font-medium text-[#171717]">
                    Tenancy Document
                  </p>
                </div>
                <div className="flex justify-center items-center border border-[#F3F4F6] shadow-sm  py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]">
                  View
                </div>
              </div>
            </div>
            <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1">
                  <Image
                    src="/images/file-icon.svg"
                    alt="file-icon"
                    width={32}
                    height={32}
                  />
                  <p className="text-sm font-medium text-[#171717]">
                    Tenancy Document
                  </p>
                </div>
                <div className="flex justify-center items-center border border-[#F3F4F6] shadow-sm  py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]">
                  View
                </div>
              </div>
            </div>
            <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1">
                  <Image
                    src="/images/file-icon.svg"
                    alt="file-icon"
                    width={32}
                    height={32}
                  />
                  <p className="text-sm font-medium text-[#171717]">
                    Tenancy Document
                  </p>
                </div>
                <div className="flex justify-center items-center border border-[#F3F4F6] shadow-sm  py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]">
                  View
                </div>
              </div>
            </div>
            <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1">
                  <Image
                    src="/images/file-icon.svg"
                    alt="file-icon"
                    width={32}
                    height={32}
                  />
                  <p className="text-sm font-medium text-[#171717]">
                    Tenancy Document
                  </p>
                </div>
                <div className="flex justify-center items-center border border-[#F3F4F6] shadow-sm  py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]">
                  View
                </div>
              </div>
            </div>
            <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1">
                  <Image
                    src="/images/file-icon.svg"
                    alt="file-icon"
                    width={32}
                    height={32}
                  />
                  <p className="text-sm font-medium text-[#171717]">
                    Tenancy Document
                  </p>
                </div>
                <div className="flex justify-center items-center border border-[#F3F4F6] shadow-sm  py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]">
                  View
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
}
