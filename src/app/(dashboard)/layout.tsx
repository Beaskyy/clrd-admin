"use client";

import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { AuthGuard } from "@/components/auth-guard";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      setScreenSize(currentWidth);

      if (currentWidth > 900 && !activeMenu) {
        setActiveMenu(true); // Reopen the menu if the width exceeds 900
      } else if (currentWidth <= 900 && activeMenu) {
        setActiveMenu(false); // Close the menu if the width is less than or equal to 900
      }
    };

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Initial check to handle screen size on first render
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeMenu]);

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  return (
    <AuthGuard>
      <main>
        <div
          className="flex relative"
          onClick={() => {
            if (activeMenu) {
              handleCloseSidebar();
            }
          }}
        >
          {activeMenu && (
            <div className="w-[272px] fixed z-50 left-0">
              <Sidebar />
            </div>
          )}
          <div
            className={`min-h-screen w-full ${
              activeMenu ? "md:ml-64" : "flex-2"
            }`}
          >
            <div className="fixed md:static w-full z-20">
              <Header />
            </div>
          </div>
          <div
            className={`absolute top-16 transition-all duration-300 ${
              activeMenu
                ? "md:w-[calc(100%-272px)] w-full overflow-hidden md:left-[272px]"
                : "w-full md:left-0"
            }`}
          >
            {children}
          </div>
        </div>
      </main>
    </AuthGuard>
  );
};

export default DashboardLayout;
