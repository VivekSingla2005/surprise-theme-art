import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const phoneBrands = ["Apple", "Samsung", "OnePlus", "Xiaomi", "Realme", "Oppo", "Vivo", "Google"];
const phoneModels: Record<string, string[]> = {
  Apple: ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16", "iPhone 15 Pro Max", "iPhone 15", "iPhone 14"],
  Samsung: ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24", "Galaxy A55", "Galaxy A35"],
  OnePlus: ["OnePlus 12", "OnePlus 12R", "OnePlus Nord 4", "OnePlus Nord CE4"],
  Xiaomi: ["Xiaomi 14", "Xiaomi 14 Ultra", "Redmi Note 13 Pro+", "Redmi Note 13"],
  Realme: ["Realme GT 6", "Realme 12 Pro+", "Realme Narzo 70"],
  Oppo: ["Oppo Reno 12 Pro", "Oppo Reno 12", "Oppo A3 Pro"],
  Vivo: ["Vivo X100 Pro", "Vivo V30 Pro", "Vivo T3"],
  Google: ["Pixel 9 Pro", "Pixel 9", "Pixel 8a", "Pixel 8"],
};
const phoneColors = ["Black", "White", "Green", "Pink", "Blue", "Red", "Gold", "Silver"];
const vibes = ["Cute", "Dark", "Aesthetic", "Minimal", "Bold", "Emotional", "Funny"];

const CustomDesign = () => {
  const [step, setStep] = useState(0);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [theme, setTheme] = useState("");
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  const toggleVibe = (v: string) =>
    setSelectedVibes((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );

  const canNext = () => {
    if (step === 0) return brand && model && color;
    if (step === 1) return theme.trim().length > 10;
    if (step === 2) return true;
    if (step === 3) return agreed;
    return false;
  };

  const handleSubmit = () => {
    toast.success("Your surprise cover order has been submitted! 🎉", {
      description: "We'll start designing your masterpiece right away.",
    });
    // Reset
    setStep(0);
    setBrand("");
    setModel("");
    setColor("");
    setTheme("");
    setSelectedVibes([]);
    setAgreed(false);
  };

  const stepTitles = ["Phone Details", "Your Theme", "Select Vibe", "Confirm"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pb-24 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Create a <span className="text-gradient">Surprise Cover</span>
          </h1>
          <p className="mt-2 text-muted-foreground">
            Describe your theme — we'll design the rest. ₹500
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-10 flex items-center gap-2">
          {stepTitles.map((title, i) => (
            <div key={title} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {title}
              </span>
              {i < 3 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
              )}
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-8 shadow-card">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  📱 Phone Details
                </h2>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Phone Brand
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {phoneBrands.map((b) => (
                      <button
                        key={b}
                        onClick={() => { setBrand(b); setModel(""); }}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                          brand === b
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-secondary text-secondary-foreground hover:border-primary/40"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
                {brand && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">
                      Phone Model
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {phoneModels[brand]?.map((m) => (
                        <button
                          key={m}
                          onClick={() => setModel(m)}
                          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                            model === m
                              ? "bg-primary text-primary-foreground"
                              : "border border-border bg-secondary text-secondary-foreground hover:border-primary/40"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Phone Back Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {phoneColors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                          color === c
                            ? "bg-primary text-primary-foreground"
                            : "border border-border bg-secondary text-secondary-foreground hover:border-primary/40"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  🎨 Describe Your Theme
                </h2>
                <p className="text-sm text-muted-foreground">
                  Be as creative as you like — the more detail, the better the surprise!
                </p>
                <textarea
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="e.g. I want a dark anime theme with red highlights and a mysterious vibe. Maybe a lone samurai under a blood moon..."
                  rows={5}
                  className="w-full rounded-lg border border-border bg-secondary p-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground">
                  {theme.length} characters — minimum 10
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  🎭 Select Your Vibe
                </h2>
                <p className="text-sm text-muted-foreground">
                  Optional — helps our designers capture the right mood.
                </p>
                <div className="flex flex-wrap gap-3">
                  {vibes.map((v) => (
                    <button
                      key={v}
                      onClick={() => toggleVibe(v)}
                      className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                        selectedVibes.includes(v)
                          ? "bg-primary text-primary-foreground shadow-glow"
                          : "border border-border bg-secondary text-secondary-foreground hover:border-primary/40"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  ✅ Review & Confirm
                </h2>
                <div className="space-y-3 rounded-lg border border-border bg-secondary p-5 text-sm">
                  <p>
                    <span className="text-muted-foreground">Phone:</span>{" "}
                    <span className="font-medium text-foreground">{brand} {model} ({color})</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Theme:</span>{" "}
                    <span className="font-medium text-foreground">{theme}</span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Vibes:</span>{" "}
                    <span className="font-medium text-foreground">
                      {selectedVibes.length > 0 ? selectedVibes.join(", ") : "None selected"}
                    </span>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Price:</span>{" "}
                    <span className="text-gradient font-bold">₹500</span>
                  </p>
                </div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    I understand that I will <strong className="text-foreground">not receive a preview</strong>.
                    The final design will be a creative surprise based on my description.
                  </span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canNext()}
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40"
              >
                <Sparkles className="h-4 w-4" /> Submit Order
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomDesign;
