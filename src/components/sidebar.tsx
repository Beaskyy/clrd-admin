import { links } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Sidebar = () => {
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <div className="w-[272px] bg-[#001B0D] h-screen fixed flex flex-col py-6 px-4">
      <div className="flex flex-col justify-between min-h-[95vh]">
        <div>
          <div className="py-2">
            <div className="flex justify-between items-center py-2 px-2 rounded">
              <Link href="/profile" className="flex gap-3 items-center">
                <div className="relative w-10 h-10 rounded-full">
                  <Image
                    src="/images/avatar.svg"
                    alt="Avatar"
                    fill
                    className="absolute rounded-full"
                  />
                </div>
                <div className="flex flex-col text-white text-sm leading-[18.9px]">
                  <h6 className="font-semibold">David Olufunmi</h6>
                  <h6 className="font-normal">Profile</h6>
                </div>
              </Link>
              <ChevronsUpDown className="size-5 text-white" />
            </div>
          </div>
          <nav className="flex flex-col gap-5 mt-4 lg:overflow-hidden overflow-auto lg:hover:overflow-auto">
            {links?.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                onMouseEnter={() => setHoveredLink(link.name)} // Set hover state
                onMouseLeave={() => setHoveredLink(null)} // Clear hover state
                className={cn(
                  `flex items-center gap-3 py-3 px-4 text-white hover:text-[#001B0D] hover:bg-[#F5F5F7] rounded cursor-pointer`,
                  pathname === link.href && "bg-[#F5F5F7] text-[#001B0D]"
                )}
              >
                <Image
                  src={
                    hoveredLink === link.name || pathname === link.href
                      ? link.icon2
                      : link.icon
                  }
                  alt={link.name}
                  width={24}
                  height={24}
                />
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <Image src="/logo.png" alt="logo" width={119} height={31} />
      </div>
    </div>
  );
};
