import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, customItems, removeItem, removeCustomItem, updateQuantity, totalPrice, totalItems } = useCart();

  const empty = totalItems === 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pb-24 pt-28">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Your <span className="text-gradient">Cart</span>
          </h1>
        </motion.div>

        {empty ? (
          <div className="flex flex-col items-center gap-6 py-20 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
            <p className="text-lg text-muted-foreground">Your cart is empty</p>
            <Link to="/designs" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90">
              Browse Designs
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((item) => (
                <motion.div
                  key={item.design.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-card"
                >
                  <img src={item.design.image} alt={item.design.name} className="h-24 w-24 rounded-lg object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">{item.design.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.phoneModel} · {item.design.category}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.design.id, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.design.id, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="text-gradient font-display font-bold">₹{item.design.price * item.quantity}</span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.design.id)} className="self-start text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}

              {customItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4 rounded-xl border border-primary/20 bg-card p-4 shadow-card"
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-primary/10 text-3xl">🎨</div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground">Surprise Cover</h3>
                      <p className="text-xs text-muted-foreground">{item.brand} {item.model} · {item.color}</p>
                      <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">"{item.theme}"</p>
                    </div>
                    <span className="text-gradient font-display font-bold">₹{item.price}</span>
                  </div>
                  <button onClick={() => removeCustomItem(item.id)} className="self-start text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="h-fit rounded-xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-xl font-semibold text-foreground">Order Summary</h3>
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
              <Link
                to="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground hover:opacity-90"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
