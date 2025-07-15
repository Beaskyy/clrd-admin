import {
  Sheet,
  SheetContent,
  // SheetDescription,
  // SheetHeader,
  // SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { links } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Navigation = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const handleClick = (name: string) => {
    setActiveLink(name);
    setIsSheetOpen(false);
  };
  return (
    <div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger>
          <AlignJustify className="size-6" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-[#001B0D]">
          <nav className="flex flex-col gap-5 mt-14 lg:overflow-hidden overflow-auto lg:hover:overflow-auto">
            {links?.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                onClick={() => handleClick(link.name)}
                onMouseEnter={() => setHoveredLink(link.name)} // Set hover state
                onMouseLeave={() => setHoveredLink(null)} // Clear hover state
                className={cn(
                  `flex items-center gap-3 py-3 px-4 text-white hover:text-[#001B0D] hover:bg-[#F5F5F7] rounded cursor-pointer`,
                  activeLink === link.name && "bg-[#F5F5F7] text-[#001B0D]"
                )}
              >
                <Image
                  src={
                    hoveredLink === link.name || activeLink === link.name
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
        </SheetContent>
      </Sheet>
    </div>
  );
};
