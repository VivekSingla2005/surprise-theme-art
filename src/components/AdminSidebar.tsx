import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Palette, Package, Sparkles, ArrowLeft, Settings, Users } from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/designs", label: "Designs", icon: Palette },
  { to: "/admin/orders", label: "Orders", icon: Package },
  { to: "/admin/custom-requests", label: "Custom Requests", icon: Sparkles },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-sidebar-background">
      <div className="flex items-center gap-2 border-b border-border px-6 py-5">
        <Sparkles className="h-5 w-5 text-primary" />
        <span className="font-display text-lg font-bold text-foreground">
          Riham <span className="text-gradient">Creates</span>
        </span>
        <span className="ml-1 rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
          Admin
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
