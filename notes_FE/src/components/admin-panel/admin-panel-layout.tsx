"use client";

import { Sidebar } from "@/components/admin-panel/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import BaseHeader from "../widgets/base-header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const HIDE_HEADER_PATHS = ["/warehouse/inventory", "/users/profile", "/roles-permissions"];

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebar, (x) => x);
  const { pathname } = useLocation();

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
  const { getOpenState, toggleOpen, settings } = sidebar;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-[margin] ease-in-out duration-300",
          !settings.disabled &&
          (isSmallScreen
            ? "ml-0 mr-0"
            : !getOpenState()
              ? i18n.language === "ar"
                ? "lg:mr-[90px]"
                : "lg:ml-[90px]"
              : i18n.language === "ar"
                ? "lg:mr-72"
                : "lg:ml-72"
          ),
          i18n.language === "ar" ? "mr-0 sm:mr-[90px]" : "ml-0 sm:ml-[90px]"
        )}
      >

        {!HIDE_HEADER_PATHS.includes(pathname) && (
          <div>
            <BaseHeader />
          </div>
        )}
        {children}
      </main>
    </>
  );
}
