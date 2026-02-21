import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Palette, Package, Sparkles, Star, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DesignCard from "@/components/DesignCard";
import heroImage from "@/assets/hero-phone.png";
import { designs } from "@/data/designs";

const steps = [
  {
    icon: ShoppingBag,
    title: "Choose or Describe",
    desc: "Pick a ready design or describe your dream theme.",
  },
  {
    icon: Palette,
    title: "We Create",
    desc: "Our designers craft a unique cover just for you.",
  },
  {
    icon: Package,
    title: "Unbox the Surprise",
    desc: "Receive a one-of-a-kind masterpiece at your door.",
  },
];

const testimonials = [
  { name: "Priya S.", text: "I just said 'dark anime vibes' and they absolutely nailed it. Blown away!", rating: 5 },
  { name: "Arjun M.", text: "The surprise concept is genius. My cover was way better than I imagined.", rating: 5 },
  { name: "Sneha R.", text: "Ordered for my friend's birthday. She loved the mountain aesthetic cover!", rating: 5 },
];

const Index = () => {
  const featured = designs.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <div className="absolute inset-0 glow-bg" />
        <div className="container relative mx-auto grid items-center gap-12 px-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
              Custom & Surprise Covers
            </p>
            <h1 className="font-display text-3xl font-black leading-tight text-foreground sm:text-5xl md:text-7xl">
              Your Phone.
              <br />
              <span className="text-gradient">Your Theme.</span>
              <br />
              Our Creativity.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Describe your vibe and receive a hand-crafted surprise phone cover — or browse our collection of bold, ready-made designs.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/designs"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90"
              >
                <ShoppingBag className="h-4 w-4" />
                Browse Designs
              </Link>
              <Link
                to="/custom"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-all hover:border-primary/40"
              >
                <Sparkles className="h-4 w-4" />
                Create Surprise Cover
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative mx-auto max-w-xs lg:max-w-none"
          >
            <img
              src={heroImage}
              alt="Custom phone cover floating"
              className="w-full animate-float rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-border py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="mt-3 text-muted-foreground">Three simple steps to your dream cover</p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-xl border border-border bg-card p-8 text-center shadow-card"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="border-t border-border py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                Featured <span className="text-gradient">Designs</span>
              </h2>
              <p className="mt-2 text-muted-foreground">Hand-picked favourites from our collection</p>
            </div>
            <Link
              to="/designs"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((d, i) => (
              <DesignCard key={d.id} design={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Loved by <span className="text-gradient">500+</span> Customers
            </h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">"{t.text}"</p>
                <p className="mt-4 text-xs font-semibold text-foreground">— {t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl rounded-2xl border border-primary/20 bg-card p-6 sm:p-12 shadow-glow"
          >
            <Sparkles className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Ready for Your <span className="text-gradient">Surprise</span>?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us your vibe — we'll craft something you'll never expect.
            </p>
            <Link
              to="/custom"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              <Palette className="h-4 w-4" />
              Start Your Custom Cover
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
