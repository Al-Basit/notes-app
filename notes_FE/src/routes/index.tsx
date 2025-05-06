import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/pages/auth/login-page";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import AuthRoutes from "./auth-routes";
import Dashboard from "@/pages/dashboard";
// import NotFoundPage from "@/pages/fallbacks/not-found";
// import AccessDeniedPage from "@/pages/fallbacks/access-denied";

const router = createBrowserRouter([
  {
    element: <AuthRoutes />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
        index: true,
      },
  
    ],
  },
  {
    element: (
        <DashboardLayout />
    ),
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard/>,
          },
          {
            path: "/products",
            children: [
              {
                path: "view", // no leading slash
                element: <Dashboard />,
              },
              {
                path: "add", // no leading slash
                element: <Dashboard />,
              },
            ],
          },
        ],
      },
    ],
  },
  // {
  //   path: "/access-denied",
  //   element: <AccessDeniedPage />,
  // },
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  // },
]);

export default router;
