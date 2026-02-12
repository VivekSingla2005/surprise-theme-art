import { motion } from "framer-motion";
import type { Design } from "@/data/designs";

interface DesignCardProps {
  design: Design;
  index: number;
}

const DesignCard = ({ design, index }: DesignCardProps) => (
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
          <h3 className="font-display text-lg font-semibold text-foreground">
            {design.name}
          </h3>
          <p className="text-xs text-muted-foreground">{design.category}</p>
        </div>
        <span className="text-gradient font-display text-lg font-bold">
          ₹{design.price}
        </span>
      </div>
      <button className="mt-3 w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90">
        Order Now
      </button>
    </div>
  </motion.div>
);

export default DesignCard;
