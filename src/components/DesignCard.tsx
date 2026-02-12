import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import type { Design } from "@/data/designs";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const defaultModel = "Universal Fit";

interface DesignCardProps {
  design: Design;
  index: number;
}

const DesignCard = ({ design, index }: DesignCardProps) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(design, defaultModel);
    setAdded(true);
    toast.success(`${design.name} added to cart!`);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group overflow-hidden rounded-lg border border-border bg-card shadow-card transition-all hover:border-primary/30 hover:shadow-glow"
    >
      <div className="aspect-square overflow-hidden bg-secondary">
        <img
          src={design.image}
          alt={design.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">{design.name}</h3>
            <p className="text-xs text-muted-foreground">{design.category}</p>
          </div>
          <span className="text-gradient font-display text-lg font-bold">₹{design.price}</span>
        </div>
        <button
          onClick={handleAdd}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold transition-all ${
            added
              ? "bg-green-600 text-white"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          {added ? <><Check className="h-4 w-4" /> Added</> : <><ShoppingCart className="h-4 w-4" /> Add to Cart</>}
        </button>
      </div>
    </motion.div>
  );
};

export default DesignCard;
