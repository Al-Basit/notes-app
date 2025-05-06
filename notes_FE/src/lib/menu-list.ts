import { useTranslation } from "react-i18next";


import {
  LayoutDashboardIcon,
  Package,
  Warehouse,
  CalendarClockIcon,
  SettingsIcon,
  Layers,
  FileText,
  Diameter,
  CheckCircle,
  ClipboardCheck,
  ShoppingBag,
  Users,
  Tag,
  Box,
  Truck,
  Bell,
  Speaker,
  Calendar,
  CalendarPlus2,
  ClipboardPlus,
  CalendarDays,
  SquareChartGantt,
  ClipboardPenLine,
  UserRoundCheck,
  Landmark,
  Container,
  CarFront,
  Target,
  Route,
  WalletCards,
} from "lucide-react";
import { FaFileInvoice, FaLayerGroup } from "react-icons/fa";
import { useMemo } from "react";

export function getMenuList(t: (key: string) => string) {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: t("sideBar.dashboard"),
          icon: LayoutDashboardIcon,
          // permissions: ["read-statistics"],
        },
        {
          href: "/products",
          label: t("sideBar.products"),
          icon: Package,
          submenus: [
            {
              href: "/products/view",
              label: t("sideBar.vproducts"),
              icon: Box,
              permissions: [
                "create-product",
                "read-product",
                "update-product",
                "delete-product",
                "manage-product",
              ],
            },
            {
              href: "/categories/view",
              label: t("sideBar.pcategories"),
              icon: Tag,
              permissions: [
                "create-category",
                "read-category",
                "update-category",
                "delete-category",
              ],
            },
          ],
        },
        {
          href: "/batch/view",
          label: t("sideBar.batch"),
          icon: Layers,
          permissions: [
            "create-batch",
            "read-batch",
            "update-batch",
            "delete-batch",
            "verify-batch-item",
          ],
        },
        {
          href: "/warehouse/view",
          label: t("sideBar.warehouse"),
          icon: Warehouse,
          submenus: [
            {
              href: "/warehouse/view",
              label: t("sideBar.vwarehouse"),
              // @ts-ignore
              icon: FaLayerGroup,
              permissions: [
                "create-warehouse",
                "read-warehouse",
                "update-warehouse",
                "delete-warehouse",
                "manage-inventory",
              ],
            },
            {
              href: "/warehouse/transfer",
              label: t("sideBar.transferinventory"),
              icon: Truck,
              permissions: ["read-inventory-movement"],
            },
          ],
        },
        {
          href: "/sales",
          label: t("sideBar.sales"),
          icon: Landmark,
          submenus: [
            {
              href: "/sales/view-plans",
              label: t("sideBar.salesplan"),
              icon: Calendar,
              permissions: ["read-journey-plan", "manage-journey-plan"],
            },
            {
              href: "/sales/target",
              label: "Sales Target",
              icon: Target,
              permissions: ["read-journey-plan", "manage-journey-plan"],
            },
            {
              href: "/sales/monitor",
              label: "Salesperson Route Monitoring",
              icon: Route,
              permissions: ["read-journey-plan", "manage-journey-plan"],
            },
            {
              href: "/attendance",
              label: t("sideBar.attendance"),
              icon: ClipboardCheck,
              permissions: [
                "create-attendance",
                "read-attendance",
                "update-attendance",
                "delete-attendance",
                "manage-attendance",
              ],
            },
            {
              href: "/odometer",
              label: "Odometer",
              icon: Diameter,
              submenus: [],
              permissions: [
                "read-odometer",
                "create-odometer",
                "manage-odometer",
              ],
            },
            {
              href: "/vehicle/view",
              label: "Vehicles",
              icon: CarFront,
              submenus: [],
              // permissions: [

              // ],
            },
            {
              href: "/order/create",
              label: t("sideBar.createSale"),
              icon: WalletCards,
              permissions: [
                "create-order",
                "manage-order",
              ],
            },
            {
              href: "/order/view",
              label: t("sideBar.orders"),
              icon: ShoppingBag,
              permissions: [
                "update-order",
                "delete-order",
                "manage-order",
              ],
            },
            {
              href: "/invoice/create",
              label: 'Create Invoice',
              icon: ClipboardPlus,
              permissions: [
                "create-invoice",
                "manage-invoice",
              ],
            },
            {
              href: "/invoice/store",
              label: "Sales Invoices",
              // @ts-ignore
              icon: FaFileInvoice,
              submenus: [],
              permissions: [
                "read-invoice",
                "create-invoice",
                "update-invoice",
                "manage-invoice",
              ],
            },
          ],
        },

        {
          href: "/leads",
          label: t("sideBar.leads"),
          icon: Users,
          submenus: [
            {
              href: "/leads/new",
              label: t("sideBar.createlead"),
              icon: ClipboardPlus,
              permissions: ["create-lead"],
            },
            {
              href: "/leads/status",
              label: t("sideBar.mleads"),
              icon: SquareChartGantt,
              permissions: ["read-lead", "manage-lead"],
            },
          ],
        },

        {
          href: "/complaints",
          label: t("sideBar.complaint"),
          icon: ClipboardPenLine,
          submenus: [
            {
              href: "/complaints/create",
              label: t("sideBar.createcomplaint"),
              icon: FileText,
              permissions: ["create-complaint", "update-complaint"],
            },
            {
              href: "/complaints/view",
              label: t("sideBar.viewcomplaint"),
              icon: SquareChartGantt,
              permissions: ["read-complaint", "manage-complaint"],
            },
          ],
        },
        {
          href: "/logs",
          label: t("sideBar.logs"),
          icon: FileText,
          permissions: [
            "read-log",
            "manage-log",
            "read-verification-log",
            "manage-verification-log",
            "inventory-movement",
          ],
        },
        {
          href: "/announcements",
          label: t("sideBar.updates"),
          icon: CalendarClockIcon,
          submenus: [
            {
              href: "/announcements",
              label: t("sideBar.announcements"),
              icon: Speaker,
              permissions: [
                "create-announcement",
                "read-announcement",
                "delete-announcement",
              ],
            },
            {
              href: "/meetings",
              // label: t("sideBar.meeting"),
              label: "Meetings",
              icon: CalendarDays,
              permissions: ["read-meeting", "create-meeting", "update-meeting"],
            },
            {
              href: "/notifications",
              label: t("sideBar.notifications"),
              icon: Bell,
              permissions: [
                "create-push-notification",
                "read-push-notification",
              ],
            },
          ],
        },
        {
          href: "/users/view",
          label: t("sideBar.usermanagement"),
          icon: Users,
          submenus: [
            {
              href: "/customers/view",
              label: t("sideBar.customers"),
              icon: UserRoundCheck,
              permissions: [
                "create-customer",
                "read-customer",
                "update-customer",
                "delete-customer",
                "manage-customer",
              ],
            },
            {
              href: "/users/view",
              label: t("sideBar.users"),
              icon: CheckCircle,
              permissions: [
                "create-user",
                "read-user",
                "update-user",
                "delete-user",
                "manage-user",
              ],
            },
            {
              href: "/distributor/view",
              label: t("sideBar.distributors"),
              icon: Truck,
              permissions: ["read-distributor", "manage-distributor"],
            },
            {
              href: "/supplier/view",
              label: t("sideBar.supplier"),
              icon: Container,
              permissions: [
                "read-supplier",
                "create-supplier",
                "update-supplier",
              ],
            },
          ],
        },
        {
          href: "/task",
          label: "Task Management",
          icon: FileText,
          permissions: [
            "create-task",
            "read-task",
            "update-task",
            "delete-task",
            "manage-task",
          ],
          submenus: [],
        },

        {
          href: "/roles-permissions",
          label: "Roles & Permissions",
          icon: ClipboardCheck,
          permissions: [
            "create-role",
            "read-role",
            "update-role",
            "delete-role",
            "grant-permission",
            "remove-permission",
          ],
        },

        {
          href: "/settings",
          label: t("sideBar.settings"),
          icon: SettingsIcon,
          permissions: ["read-settings", "update-settings"],
        },
      ],
    },
  ];
}
