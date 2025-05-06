import React, { useEffect, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  MenuIcon,
  Globe,
  Settings,
  Edit3,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import tokenService from "@/services/token.service";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import { useTranslation } from "react-i18next";
import { useSidebar } from "@/hooks/use-sidebar";
import { Sidebar } from "../admin-panel/sidebar";
import UserService from "@/services/users.service";
import { MEDIA_BASEURL } from "@/lib/constants";

const BaseHeader = () => {
  const navigate = useNavigate();
  const userId = tokenService.getUserId();

  const { useFetchSingleUser } = UserService();
  const { data: users } = useFetchSingleUser(userId?.toString() || "");
  const user = useMemo(() => {
    return users?.data;
  }, [users]);
  const location = useLocation();
  // const { user, setUser } = useAuthStore();

  const { t, i18n } = useTranslation();

  const sidebar = useSidebar();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // const [theme, setTheme] = useState<"light" | "dark">("light");


  // Define the route-to-breadcrumb mapping
  const breadcrumbMap = {
    "/": t("breadcrumb.dashboard"),
    "/products/view": t("breadcrumb.productsView"),
    "/products/add": t("breadcrumb.productsAdd"),
    "/batch/view": t("breadcrumb.batchView"),
    "/batch/details": t("breadcrumb.batchDetails"),
    "/batch/add": t("breadcrumb.batchAdd"),
    "/warehouse/view": t("breadcrumb.warehouseView"),
    "/warehouse/add": t("breadcrumb.warehouseAdd"),
    "/warehouse/inventory": t("breadcrumb.inventory"),
    "/categories/view": t("breadcrumb.categoriesView"),
    "/logs": t("breadcrumb.logs"),
    "/users/view": t("breadcrumb.usersView"),
    "/announcements": t("breadcrumb.announcements"),
    "/notifications": t("breadcrumb.notifications"),
    "/settings": t("breadcrumb.settings"),
  };

  const validRoutes = Object.keys(breadcrumbMap);

  // Get the current pathnames as an array
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Generate full paths for breadcrumb
  const generateBreadcrumbPath = (index: number) =>
    `/${pathnames.slice(0, index + 1).join("/")}`;

  // Check if a path is valid by looking it up in the valid routes array
  const isValidRoute = (path: string) => validRoutes.includes(path);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   document.documentElement.classList.toggle("dark");
  // };

  const handleChangeDashboard = (value: string) => {
    navigate(`/dashboard/${value}`);
  };

  return (
    <header className="sticky top-0 flex items-center gap-4 px-4 border-b z-9 h-14 bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Button
        size="icon"
        variant="outline"
        className="sm:hidden"
        onClick={sidebar.toggleOpen}
      >
        <MenuIcon className="w-5 h-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Sidebar */}
      {isSmallScreen && <Sidebar />}

      <img
        src="/notes.png"
        alt="Notes"
        className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20"
      />
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">{t("breadcrumb.home")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathnames.map((_, index) => {
            const to = generateBreadcrumbPath(index);
            const isLast = index === pathnames.length - 1;
            //@ts-ignore
            const label = breadcrumbMap[to];

            // Only render breadcrumbs for valid routes
            return isValidRoute(to) ? (
              <React.Fragment key={to}>
                <BreadcrumbSeparator
                  className={i18n.language === "ar" ? "rotate-180" : ""}
                />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={to}>{label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ) : null;
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative flex-1 ml-auto md:grow-0">
        {/* Search component can be added here */}
      </div>

      { location.pathname.startsWith('/dashboard') && <Select onValueChange={handleChangeDashboard}>
      <SelectTrigger className="w-64 border border-gray-300 rounded-lg shadow-sm">
        <SelectValue placeholder="Select Dashboard" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="/">Default</SelectItem>
        <SelectItem value="sales">Sales Dashboard</SelectItem>
        <SelectItem value="inventory">Inventory Dashboard</SelectItem>
      </SelectContent>
    </Select>}

      {/* <div className="flex items-center gap-2"> */}
      <div className="flex items-center gap-4 pl-4 ">


        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Globe className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                i18n.changeLanguage("en");
              }}
            >
              {/* <Flag
                code="US"
                style={{ width: 30, height: 20, marginRight: 8 }}
              /> */}
              English
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                i18n.changeLanguage("ar");
              }}
            >
              {/* <Flag
                code="SA"
                style={{ width: 30, height: 20, marginRight: 8 }}
              /> */}
              Arabic
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="px-2 border-l-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={`${MEDIA_BASEURL}/${user?.profile.image}`}
                  />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.role?.title}
                  </p>
                </div>
                <ChevronDown height={20} width={24} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[280px] p-0" align="end">
              {/* <div className="flex items-center gap-4 p-4">
                <Avatar className="w-12 h-12"> */}
              <div className="flex items-center gap-3 p-4 transition-opacity cursor-pointer hover:opacity-80 ">
                <Avatar className="border-2 h-9 w-9 border-muted">
                  <AvatarImage src={user?.profile?.image} />
                  <AvatarFallback>
                    {user?.profile.image}
                    {user?.profile?.image
                      ? null
                      : `${user?.firstName?.charAt(0) || ""}${
                          user?.lastName?.charAt(0) || ""
                        }`}
                  </AvatarFallback>
                </Avatar>
                {/* <div className="space-y-1">
                  <h2 className="text-base font-semibold leading-none"> */}
                <div className="hidden md:block text-left space-y-0.5">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  {/* </h2> */}
                  <p className="text-sm text-muted-foreground">
                    {user?.role?.title}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator className="mb-2" />
              <div className="px-2 py-2">
                <p className="px-2 mb-2 text-xs text-muted-foreground">
                  {user?.email}
                </p>
                <DropdownMenuItem
                  className="gap-3 h-9"
                  onClick={() => navigate(`/users/add`, { state: user })}
                >
                  <Edit3 className="w-4 h-4" />

                  <span>Edit profile</span>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <div className="px-2 py-2">
                {/* <DropdownMenuItem className="gap-3 h-9" onClick={toggleTheme}>
                  {theme === "light" ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                  <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem
                  className="gap-3 h-9"
                  onClick={() => navigate("/settings")}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <div className="px-2 py-2">
                <DropdownMenuItem
                  className="gap-3 text-red-500 h-9 focus:text-red-500"
                  onClick={() => {
                    tokenService.clearStorage();
                    // setUser(null);
                    navigate("/login");
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <img
                src="/placeholder.svg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigate("/settings");
              }}
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                tokenService.clearStorage();
                setUser(null);
                navigate("/login");
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </header>
  );
};

export default BaseHeader;
