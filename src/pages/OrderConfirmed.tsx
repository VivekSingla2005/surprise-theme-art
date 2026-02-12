import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderConfirmed = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="flex min-h-[70vh] items-center justify-center px-6 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-md rounded-2xl border border-primary/20 bg-card p-10 text-center shadow-glow"
      >
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
        <h1 className="font-display text-3xl font-bold text-foreground">
          Order <span className="text-gradient">Confirmed!</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          We've received your order. Our designers will start crafting your cover right away. 🎨
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          A confirmation will be sent to your email.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
        >
          Back to Home <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
    <Footer />
  </div>
);

export default OrderConfirmed;
