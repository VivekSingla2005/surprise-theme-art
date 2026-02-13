import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const mockCustomers = [
  { id: 1, name: "Arjun Sharma", email: "arjun@email.com", phone: "+91 98765 43210", orders: 3, totalSpent: "₹1,500", lastOrder: "2026-02-12" },
  { id: 2, name: "Priya Mehta", email: "priya@email.com", phone: "+91 87654 32109", orders: 2, totalSpent: "₹1,000", lastOrder: "2026-02-11" },
  { id: 3, name: "Rahul Kumar", email: "rahul@email.com", phone: "+91 76543 21098", orders: 1, totalSpent: "₹500", lastOrder: "2026-02-10" },
  { id: 4, name: "Sneha Das", email: "sneha@email.com", phone: "+91 65432 10987", orders: 4, totalSpent: "₹2,000", lastOrder: "2026-02-09" },
  { id: 5, name: "Vikram Patel", email: "vikram@email.com", phone: "+91 54321 09876", orders: 1, totalSpent: "₹500", lastOrder: "2026-02-08" },
];

const Customers = () => {
  const [search, setSearch] = useState("");
  const filtered = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Customers</h1>
        <p className="mt-1 text-sm text-muted-foreground">View all customer information</p>
      </div>

      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Phone</th>
                <th className="px-6 py-3 font-medium">Orders</th>
                <th className="px-6 py-3 font-medium">Total Spent</th>
                <th className="px-6 py-3 font-medium">Last Order</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border/50 transition-colors hover:bg-secondary/30">
                  <td className="px-6 py-3 font-medium text-foreground">{c.name}</td>
                  <td className="px-6 py-3 text-muted-foreground">{c.email}</td>
                  <td className="px-6 py-3 text-muted-foreground">{c.phone}</td>
                  <td className="px-6 py-3 text-foreground">{c.orders}</td>
                  <td className="px-6 py-3 font-medium text-foreground">{c.totalSpent}</td>
                  <td className="px-6 py-3 text-muted-foreground">{c.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
