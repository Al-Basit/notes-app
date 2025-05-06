"use client";

import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CircleX } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!sidebar) return null;

  const { toggleOpen, getOpenState, setIsHover, settings } = sidebar;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 bg-[#262E3F] text-white z-20 h-full transition-[width] ease-in-out duration-300",
        !getOpenState() ? isSmallScreen ?  "w-[0px]" :"w-[90px]" : "w-72",
        settings.disabled && "hidden",
        i18n.language === "ar" ? "right-0" : "left-0",
      )}
    >
      {isSmallScreen && (
        <Button
          onClick={toggleOpen}
          className="absolute z-50 p-2 text-white bg-gray-800 rounded-md shadow-lg top-4 right-4"
          aria-label="Close Sidebar"
        >
          <CircleX />
        </Button>
      )}
      {!isSmallScreen && <SidebarToggle isOpen={getOpenState()} setIsOpen={toggleOpen} />}

      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative flex flex-col h-full px-3 py-4 overflow-y-auto md:shadow-md md:dark:shadow-zinc-800"
      >
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}