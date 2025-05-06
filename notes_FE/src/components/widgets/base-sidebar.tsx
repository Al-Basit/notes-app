import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BellIcon,
  CalendarClockIcon,
  LayoutDashboardIcon,
  LogsIcon,
  Package,
  PackageSearch,
  SettingsIcon,
  ShoppingCart,
  UserIcon,
  Warehouse,
  ArrowRightLeft, 
  User2Icon
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function BaseSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const ROUTES = [
    {
      title: t("sideBar.dashboard"),
      url: "/",
      icon: <LayoutDashboardIcon className="h-5 w-5" />,
    },
    {
      title: t("sideBar.products"),
      url: "/products/view",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: t("sideBar.categories"),
      url: "/categories/view",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: t("sideBar.batch"),
      url: "/batch/view",
      icon: <PackageSearch className="h-5 w-5" />,
    },
    {
      title: t("sideBar.warehouse"),
      url: "/warehouse/view",
      icon: <Warehouse className="h-5 w-5" />,
    },
    {
      title: t("sideBar.transferinventory"),
      url: "/warehouse/transfer",
      icon: <ArrowRightLeft className="h-5 w-5" />,
    },
    {
      title: t("sideBar.orders"),
      url: "/order/view",
      icon: <PackageSearch className="h-5 w-5" />,
    },
    {
      title: t("sideBar.logs"),
      url: "/logs",
      icon: <LogsIcon className="h-5 w-5" />,
    },
    {
      title: t("sideBar.announcements"),
      url: "/announcements",
      icon: <CalendarClockIcon className="h-5 w-5" />,
    },
    {
      title: t("sideBar.notifications"),
      url: "/notifications",
      icon: <BellIcon className="h-5 w-5" />,
    },
    {
      title: t("sideBar.users"),
      url: "/users/view",
      icon: <UserIcon className="h-5 w-5" />,
    },
    {
      title: t("sideBar.customers"),
      url: "/customers/view",
      icon: <User2Icon className="h-5 w-5" />,
    },
    {
      title: t("sideBar.settings"),
      url: "/settings",
      icon: <SettingsIcon className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0  z-10 flex flex-col  bg-[#262E3F] transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-14",
        isRTL ? "border-l  right-0" : "border-r left-0"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="flex flex-col items-start gap-2 px-2 py-4">
        {ROUTES.map((route, index) => (
          <Link
            key={index}
            to={route.url}
            className={cn(
              "flex items-center rounded-lg px-2 py-2 text-sm font-medium text-white transition-colors hover:bg-accent",
              pathname === route.url
                ? "bg-accent text-black"
                : "hover:bg-accent/50",
              isExpanded ? "w-full" : "w-10 justify-center"
            )}
          >
            {route.icon}
            {isExpanded && <span className="ml-3">{route.title}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
