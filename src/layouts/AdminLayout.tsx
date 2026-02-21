import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      <main className={`flex-1 overflow-auto ${isMobile ? "pt-14" : ""}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
