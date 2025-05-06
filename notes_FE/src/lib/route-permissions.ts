interface RoutePermission {
  path: string;
  key: string;
  permissions: string[];
}

const routePermissions: RoutePermission[] = [
  { path: "/login", key: "login", permissions: [] },
  { path: "/forgot-password", key: "forgot-password", permissions: [] },
  { path: "/dashboard", key: "dashboard", permissions: [] },
  { path: "/", key: "home", permissions: [] },
  {
    path: "/products/view",
    key: "products-view",
    permissions: ["read-product", "create-product", "delete-product"],
  },
  {
    path: "/products/add",
    key: "products-add",
    permissions: ["create-product", "update-product"],
  },
  { path: "/task", key: "task", permissions: ["read-task", "manage-task"] },
  {
    path: "/mytask/add",
    key: "mytask-add",
    permissions: ["create-task", "update-task"],
  },
  {
    path: "/assigntask/add",
    key: "assigntask-add",
    permissions: ["create-task"],
  },
  {
    path: "/batch/view",
    key: "batch-view",
    permissions: ["read-batch", "manage-batch"],
  },
  {
    path: "/batch/details",
    key: "batch-details",
    permissions: ["verify-batch-item", "read-batch-item"],
  },
  {
    path: "/batch/add",
    key: "batch-add",
    permissions: ["create-batch", "update-batch"],
  },
  {
    path: "/warehouse/view",
    key: "warehouse-view",
    permissions: ["read-warehouse"],
  },
  {
    path: "/warehouse/add",
    key: "warehouse-add",
    permissions: ["create-warehouse"],
  },
  {
    path: "/warehouse/inventory",
    key: "warehouse-inventory",
    permissions: [
      "read-inventory",
      "read-warehouse",
      "update-warehouse",
      "delete-warehouse",
      "manage-inventory",
    ],
  },
  {
    path: "/warehouse/transfer",
    key: "warehouse-transfer",
    permissions: ["manage-inventory"],
  },
  {
    path: "/order/view",
    key: "order-view",
    permissions: ["read-order", "update-order", "delete-order"],
  },
  {
    path: "/order/create",
    key: "order-view",
    permissions: ["create-order", "manage-order"],
  },
  //mobile-page
  {
    path: "sales/dashboard",
    key: "order-view",
    permissions: [],
  },
  {
    path: "sales/order/place",
    key: "order-view",
    permissions: ["read-order", "create-order", "update-order", "delete-order"],
  },
  {
    path: "sales/order/summary",
    key: "order-view",
    permissions: ["read-order", "create-order", "update-order", "delete-order"],
  },

  {
    path: "/order/details",
    key: "order-details",
    permissions: ["manage-order", "read-order"],
  },
  {
    path: "/categories/view",
    key: "categories-view",
    permissions: ["read-category", "create-category", "update-category"],
  },
  {
    path: "/roles-permissions",
    key: "roles-permissions",
    permissions: [
      "read-permission",
      "grant-permission",
      "remove-permission",
      "create-role",
      "update-role",
      "delete-role",
      "read-role",
    ],
  },
  { path: "/leads/status", key: "leads-status", permissions: ["read-lead"] },
  { path: "/leads/new", key: "leads-new", permissions: ["create-lead"] },
  {
    path: "/logs",
    key: "logs",
    permissions: [
      "read-log",
      "manage-log",
      "read-verification-log",
      "manage-verification-log",
      "inventory-movement",
    ],
  },
  {
    path: "/announcements",
    key: "announcements",
    permissions: ["read-announcement", "delete-announcement"],
  },
  {
    path: "/announcements/create",
    key: "announcements-create",
    permissions: ["create-announcement", "update-announcement"],
  },
  {
    path: "/notifications",
    key: "notifications",
    permissions: ["create-push-notification"],
  },
  { path: "/users/add", key: "users-add", permissions: ["create-user"] },
  {
    path: "/users/view",
    key: "users-view",
    permissions: ["read-user", "manage-user"],
  },
  { path: "/users/profile", key: "users-profile", permissions: ["read-user"] },
  {
    path: "/customers/view",
    key: "customers-view",
    permissions: ["read-customer"],
  },
  {
    path: "/customers/add",
    key: "customers-add",
    permissions: ["create-customer"],
  },
  {
    path: "/supplier/create",
    key: "supplier",
    permissions: ["create-supplier", "update-supplier"],
  },
  {
    path: "/supplier/view",
    key: "supplier-view",
    permissions: ["read-supplier"],
  },
  {
    path: "/supplier/profile",
    key: "supplier-profile",
    permissions: ["read-supplier"],
  },

  {
    path: "/meetings",
    key: "meetings",
    permissions: ["create-meeting", "update-meeting", "read-meeting"],
  },
  {
    path: "/sales/view-plans",
    key: "sales-view-plans",
    permissions: ["read-journey-plan"],
  },
  {
    path: "/sales/plan",
    key: "sales-plan",
    permissions: ["create-journey-plan"],
  },
  {
    path: "/sales/create",
    key: "sales-create",
    permissions: ["create-journey-plan"],
  },
  {
    path: "/sales/view",
    key: "sales-view",
    permissions: ["read-journey-plan", "manage-journey-plan"],
  },
  {
    path: "/invoice/store",
    key: "invoice-store",
    permissions: [
      "read-invoice",
      "create-invoice",
      "update-invoice",
      "manage-invoice",
    ],
  },
  {
    path: "/distributor/onboarding",
    key: "distributor-onboarding",
    permissions: [
      "read-distributor",
      "create-distributor",
      "update-distributor",
      "manage-distributor",
    ],
  },
  { path: "/settings", key: "settings", permissions: [] },
  {
    path: "/attendance",
    key: "attendance",
    permissions: [
      "read-attendance",
      "manage-attendance",
      "read-attendance",
      "update-attendance",
      "delete-attendance",
    ],
  },
  {
    path: "/odometer",
    key: "odometer",
    permissions: ["read-odometer", "create-odometer", "manage-odometer"],
  },
  { path: "/access-denied", key: "access-denied", permissions: [] },
  { path: "*", key: "not-found", permissions: [] },
];

export default routePermissions;

//   below permission are not included

// update-batch
// delete-batch
// update-category
// delete-category
// update-lead
// delete-lead
// update-task
// delete-task
// update-user
// delete-user
// update-warehouse
// delete-warehouse
// update-inventory
// update-store
// delete-store
// update-store-inventory
// create-stop-attendance
// update-stop-attendance
// delete-stop-attendance
// manage-stop-attendance
// update-invoice
