import { Input } from "./ui/input";
import { Bell } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Navigation } from "./navigation";
import Link from "next/link";
import { toast } from "sonner";

export const Header = () => {
  const logout = async () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      document.cookie = "token=; Max-Age=0; Path=/;";
      window.location.href = "/login";
    } catch (error: unknown) {
      const message =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : "An unexpected error occurred";
      toast.error(message);
    }
  };
  return (
    <div className="px-9 h-[66px] border-b border-[#F5F5F5] bg-white">
      <div className="py-3">
        <div className="flex justify-between items-center">
          <div className="relative flex items-center md:w-[400px]">
            <Input
              type="text"
              className="h-[42px] shadow-none rounded-3xl border border-[#F2F4F7] px-3 pl-10"
              placeholder="Search"
            />
            <Image
              src="/images/search.svg"
              alt="search"
              width={20}
              height={20}
              className="absolute left-3"
            />
          </div>
          <div className="md:flex hidden items-center gap-3">
            <div className="flex items-center justify-center size-[34px] rounded-full bg-[#F0F2F5]">
              <Bell className="size-[17px]" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex justify-center items-center rounded-[25px] w-fit h-[36px] bg-[#F0F2F5] py-2 px-3">
                  <h6 className="text-sm text-[#344054] font-medium whitespace-nowrap">
                    Administrator
                  </h6>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link href="profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="md:hidden flex">
            <Navigation />
          </div>
        </div>
      </div>
    </div>
  );
};
