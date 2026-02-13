import { Package, Palette, Sparkles, IndianRupee, TrendingUp, ShoppingCart } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "₹24,500", icon: IndianRupee, change: "+12%", color: "text-green-400" },
  { label: "Total Orders", value: "49", icon: ShoppingCart, change: "+8%", color: "text-green-400" },
  { label: "Active Designs", value: "6", icon: Palette, change: "+2", color: "text-primary" },
  { label: "Custom Requests", value: "18", icon: Sparkles, change: "+5", color: "text-accent" },
];

const recentOrders = [
  { id: "ORD-001", customer: "Arjun S.", type: "Ready-Made", design: "Neon Galaxy", status: "Shipped", amount: "₹500" },
  { id: "ORD-002", customer: "Priya M.", type: "Custom", design: "Dark Anime Theme", status: "Designing", amount: "₹500" },
  { id: "ORD-003", customer: "Rahul K.", type: "Ready-Made", design: "Geo Bold", status: "Pending", amount: "₹500" },
  { id: "ORD-004", customer: "Sneha D.", type: "Custom", design: "Minimal Nature", status: "Printing", amount: "₹500" },
  { id: "ORD-005", customer: "Vikram P.", type: "Ready-Made", design: "Kawaii Friend", status: "Delivered", amount: "₹500" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400",
  Designing: "bg-blue-500/20 text-blue-400",
  Printing: "bg-purple-500/20 text-purple-400",
  Shipped: "bg-primary/20 text-primary",
  Delivered: "bg-green-500/20 text-green-400",
};

const Dashboard = () => {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Overview of your store performance</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 font-display text-2xl font-bold text-foreground">{s.value}</p>
            <span className={`mt-1 flex items-center gap-1 text-xs font-medium ${s.color}`}>
              <TrendingUp className="h-3 w-3" />
              {s.change} from last month
            </span>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-foreground">Recent Orders</h2>
          <span className="text-xs text-muted-foreground">Last 5 orders</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Design</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-border/50 transition-colors hover:bg-secondary/30">
                  <td className="px-6 py-3 font-medium text-foreground">{o.id}</td>
                  <td className="px-6 py-3 text-foreground">{o.customer}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      o.type === "Custom" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"
                    }`}>
                      {o.type}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-muted-foreground">{o.design}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right font-medium text-foreground">{o.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
