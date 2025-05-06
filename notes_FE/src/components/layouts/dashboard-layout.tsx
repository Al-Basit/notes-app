



import { Outlet } from "react-router-dom";
import AdminPanelLayout from "../admin-panel/admin-panel-layout";

const DashboardLayout = () => {
  return (
    <AdminPanelLayout>
      <Outlet />
    </AdminPanelLayout>
  );
};
export default DashboardLayout;

