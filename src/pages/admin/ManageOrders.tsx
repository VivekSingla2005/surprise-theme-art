import { useState } from "react";
import { Search, Eye, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  type: "Ready-Made" | "Custom";
  design: string;
  model: string;
  status: string;
  amount: string;
  date: string;
  address: string;
}

const mockOrders: Order[] = [
  { id: "ORD-001", customer: "Arjun Sharma", email: "arjun@email.com", phone: "+91 98765 43210", type: "Ready-Made", design: "Neon Galaxy", model: "iPhone 15", status: "Shipped", amount: "₹500", date: "2026-02-12", address: "123 MG Road, Bangalore" },
  { id: "ORD-002", customer: "Priya Mehta", email: "priya@email.com", phone: "+91 87654 32109", type: "Custom", design: "Dark anime + red highlights", model: "Samsung S24", status: "Designing", amount: "₹500", date: "2026-02-11", address: "456 Park St, Mumbai" },
  { id: "ORD-003", customer: "Rahul Kumar", email: "rahul@email.com", phone: "+91 76543 21098", type: "Ready-Made", design: "Geo Bold", model: "OnePlus 12", status: "Pending", amount: "₹500", date: "2026-02-10", address: "789 Nehru Nagar, Delhi" },
  { id: "ORD-004", customer: "Sneha Das", email: "sneha@email.com", phone: "+91 65432 10987", type: "Custom", design: "Minimal nature + green vibes", model: "iPhone 14", status: "Printing", amount: "₹500", date: "2026-02-09", address: "321 Lake Road, Kolkata" },
  { id: "ORD-005", customer: "Vikram Patel", email: "vikram@email.com", phone: "+91 54321 09876", type: "Ready-Made", design: "Kawaii Friend", model: "Samsung A54", status: "Delivered", amount: "₹500", date: "2026-02-08", address: "654 Ring Road, Ahmedabad" },
  { id: "ORD-006", customer: "Ananya Roy", email: "ananya@email.com", phone: "+91 43210 98765", type: "Custom", design: "Space theme + purple aesthetic", model: "Pixel 8", status: "Pending", amount: "₹500", date: "2026-02-07", address: "987 Hill View, Pune" },
];

const allStatuses = ["All", "Pending", "Designing", "Printing", "Shipped", "Delivered"];

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400",
  Designing: "bg-blue-500/20 text-blue-400",
  Printing: "bg-purple-500/20 text-purple-400",
  Shipped: "bg-primary/20 text-primary",
  Delivered: "bg-green-500/20 text-green-400",
};

const ManageOrders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    if (viewOrder?.id === id) setViewOrder((prev) => prev ? { ...prev, status: newStatus } : null);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Orders</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage and track all customer orders</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          {allStatuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filterStatus === s
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Design</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
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
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className={`rounded-full border-0 px-2.5 py-0.5 text-xs font-medium ${statusColors[o.status]} cursor-pointer bg-opacity-100`}
                    >
                      {allStatuses.filter((s) => s !== "All").map((s) => (
                        <option key={s} value={s} className="bg-card text-foreground">{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Button size="sm" variant="ghost" onClick={() => setViewOrder(o)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">No orders found.</p>
        )}
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={!!viewOrder} onOpenChange={() => setViewOrder(null)}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="font-display">Order {viewOrder?.id}</DialogTitle>
          </DialogHeader>
          {viewOrder && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">Customer</p>
                  <p className="font-medium text-foreground">{viewOrder.customer}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">{viewOrder.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{viewOrder.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{viewOrder.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone Model</p>
                  <p className="font-medium text-foreground">{viewOrder.model}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium text-foreground">{viewOrder.amount}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">Design / Theme</p>
                <p className="font-medium text-foreground">{viewOrder.design}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Shipping Address</p>
                <p className="font-medium text-foreground">{viewOrder.address}</p>
              </div>
              <div>
                <p className="mb-1.5 text-muted-foreground">Status</p>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[viewOrder.status]}`}>
                  {viewOrder.status}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageOrders;
