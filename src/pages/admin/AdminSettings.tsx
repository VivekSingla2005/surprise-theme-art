import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const AdminSettings = () => {
  const [storeName, setStoreName] = useState("Riham Creates");
  const [defaultPrice, setDefaultPrice] = useState("500");
  const [expressCharge, setExpressCharge] = useState("100");
  const [premiumCharge, setPremiumCharge] = useState("600");
  const [currency, setCurrency] = useState("INR");

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Configure store and pricing</p>
      </div>

      <div className="max-w-2xl space-y-8">
        {/* General */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">General</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Store Name</label>
              <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
              </select>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">Pricing</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Default Price (₹)</label>
              <Input type="number" value={defaultPrice} onChange={(e) => setDefaultPrice(e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Premium Custom (₹)</label>
              <Input type="number" value={premiumCharge} onChange={(e) => setPremiumCharge(e.target.value)} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Express Delivery (₹)</label>
              <Input type="number" value={expressCharge} onChange={(e) => setExpressCharge(e.target.value)} />
            </div>
          </div>
        </section>

        <Button className="px-8">Save Settings</Button>
      </div>
    </div>
  );
};

export default AdminSettings;
