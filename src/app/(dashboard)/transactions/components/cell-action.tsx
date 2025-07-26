"use client";

import { CompanyColumn } from "./columns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useState } from "react";

interface CellActionProps {
  data: CompanyColumn;
}

export const CellAction = ({ data }: CellActionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Popover>
        <PopoverTrigger className="flex justify-center items-center cursor-pointer border border-[#EAECF0] h-10 rounded-lg py-2.5 px-3.5 text-sm text-[#344054]">
          View more
        </PopoverTrigger>

        <PopoverContent className="shadow-md w-[274px] rounded-lg border border-[#F2F4F7] p-0 lg:mr-9">
          <div className="py-3 px-4 border-b border-[#EAECF0] text-sm font-semibold text-[#344054]">
            More
          </div>
          <div
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer"
          >
            <Image src="/images/file.svg" alt="file" width={20} height={20} />
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
            <div className="text-sm font-medium text-[#344054]">Approve</div>
          </div>
          <div className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer">
            <Image src="/images/ban.svg" alt="ban" width={20} height={20} />
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
      </Popover>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[640px]">
          <DialogHeader>
            <DialogTitle className="border-b border-[#F3F4F6] font-inter font-normal">
              <div className="flex flex-col">
                <p className="text-lg text-[#101828] font-semibold tracking-[0.1%]">
                  More details
                </p>
                <p className="text-sm text-[#667085] mb-1">
                  View more details about the business
                </p>
              </div>
            </DialogTitle>
            <DialogDescription>{data.company_name}</DialogDescription>
          </DialogHeader>
          <div>
            <Tabs defaultValue="account" className="">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="password">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
