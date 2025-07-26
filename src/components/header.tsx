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
import { signOut, useSession } from "next-auth/react";

export const Header = () => {
  const { data: session } = useSession();

  const logout = async () => {
    try {
      // Call the logout API if needed
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "Logged out successfully");
      }
    } catch (error) {
      // Even if API call fails, we still want to logout locally
      console.error("Logout API error:", error);
    } finally {
      // Always logout locally using NextAuth
      signOut({ callbackUrl: "/login" });
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
                    {session?.user?.name ||
                      session?.user?.email ||
                      "Administrator"}
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
