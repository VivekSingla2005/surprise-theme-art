import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Checkout = () => {
  const { totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const valid = form.name.trim() && form.email.includes("@") && form.phone.length >= 10 && form.address.trim() && form.city.trim() && form.pincode.length >= 5;

  const handleOrder = () => {
    if (!valid) return;
    clearCart();
    toast.success("Order placed successfully! 🎉");
    navigate("/order-confirmed");
  };

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center gap-6 py-40 text-center">
          <p className="text-lg text-muted-foreground">Nothing to checkout</p>
          <Link to="/designs" className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground">Browse Designs</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const inputCls = "w-full rounded-lg border border-border bg-secondary p-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pb-24 pt-28">
        <Link to="/cart" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to cart
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            <span className="text-gradient">Checkout</span>
          </h1>
          <p className="mt-2 text-muted-foreground">Guest checkout — no account required</p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Contact Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Full Name *</label>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="John Doe" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-foreground">Phone *</label>
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 9876543210" className={inputCls} />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Shipping Address</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-foreground">Address *</label>
                  <input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="123, Main Street, Apartment 4B" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">City *</label>
                  <input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Mumbai" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">Pincode *</label>
                  <input value={form.pincode} onChange={(e) => update("pincode", e.target.value)} placeholder="400001" className={inputCls} />
                </div>
              </div>
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="h-fit rounded-xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-xl font-semibold text-foreground">Summary</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Items ({totalItems})</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-primary">Free</span>
              </div>
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-gradient font-display text-xl font-bold">₹{totalPrice}</span>
              </div>
            </div>
            <button
              onClick={handleOrder}
              disabled={!valid}
              className="mt-6 w-full rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
            >
              Place Order — ₹{totalPrice}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Payment integration coming soon</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
