import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Share2, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import designGalaxy from "@/assets/design-galaxy.png";

type Stage = "entry" | "suspense" | "revealing" | "final";

const TEXTS_SUSPENSE = [
  "You trusted us with your idea… 💭",
  "Our artist poured their heart into it 🎨",
  "And now… it's all yours 💖",
];

// Particle component for ambient effect
const Particles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 3,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    emoji: ["✨", "💫", "🌸", "💖", "⭐"][i % 5],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-center"
          style={{
            fontSize: p.size * 3,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.7, 0],
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
};

// Confetti burst
const Confetti = () => {
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    emoji: ["🎉", "💖", "✨", "🌟", "🎀", "💫", "🩷", "🌸"][i % 8],
    x: Math.random() * 200 - 100,
    y: -(Math.random() * 400 + 100),
    rotation: Math.random() * 720 - 360,
    size: Math.random() * 16 + 12,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2"
          style={{ fontSize: p.size }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{
            x: p.x,
            y: p.y,
            rotate: p.rotation,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
};

const Reveal = () => {
  const [stage, setStage] = useState<Stage>("entry");
  const [entryStep, setEntryStep] = useState(0);
  const [suspenseStep, setSuspenseStep] = useState(0);
  const [revealProgress, setRevealProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Entry text sequence
  useEffect(() => {
    if (stage !== "entry") return;
    if (entryStep === 0) {
      timerRef.current = setTimeout(() => setEntryStep(1), 800);
    } else if (entryStep === 1) {
      timerRef.current = setTimeout(() => setEntryStep(2), 2800);
    } else if (entryStep === 2) {
      timerRef.current = setTimeout(() => setEntryStep(3), 2400);
    }
    return () => clearTimeout(timerRef.current);
  }, [stage, entryStep]);

  // Suspense text sequence
  useEffect(() => {
    if (stage !== "suspense") return;
    setSuspenseStep(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setSuspenseStep(1), 2000));
    timers.push(setTimeout(() => setSuspenseStep(2), 4500));
    timers.push(setTimeout(() => setSuspenseStep(3), 7000));
    return () => timers.forEach(clearTimeout);
  }, [stage]);

  // Reveal animation
  useEffect(() => {
    if (stage !== "revealing") return;
    setRevealProgress(0);
    let frame = 0;
    const totalFrames = 90; // ~3 seconds at 30fps
    const interval = setInterval(() => {
      frame++;
      setRevealProgress(frame / totalFrames);
      if (frame >= totalFrames) {
        clearInterval(interval);
        setStage("final");
        setTimeout(() => setShowConfetti(true), 1500);
      }
    }, 33);
    return () => clearInterval(interval);
  }, [stage]);

  const blurAmount = stage === "revealing" ? Math.max(0, 20 * (1 - revealProgress)) : 0;
  const rotation = stage === "revealing" ? 180 * revealProgress : 0;
  const scale = stage === "revealing" ? 0.6 + 0.4 * revealProgress : 1;

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-hidden select-none">
      {/* Sound toggle */}
      <motion.button
        className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        onClick={() => setSoundOn(!soundOn)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        whileHover={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {soundOn ? (
          <Volume2 className="w-5 h-5 text-foreground" />
        ) : (
          <VolumeX className="w-5 h-5 text-foreground" />
        )}
      </motion.button>

      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, hsl(var(--primary) / 0.06), transparent 70%)`,
        }}
        animate={{
          opacity: stage === "entry" && entryStep >= 2 ? [0.3, 0.8, 0.3] : stage === "suspense" ? [0.2, 0.6, 0.2] : stage === "final" ? 0.5 : 0,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particles for suspense */}
      <AnimatePresence>
        {(stage === "suspense" || stage === "revealing") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Particles />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== STAGE: ENTRY ===== */}
      <AnimatePresence mode="wait">
        {stage === "entry" && (
          <motion.div
            key="entry"
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              {entryStep >= 1 && entryStep < 3 && (
                <motion.p
                  key="ready-text"
                  className="font-display text-2xl md:text-4xl tracking-wide text-foreground/90 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  Your custom design is ready ✨
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {entryStep >= 2 && (
                <motion.p
                  key="breath-text"
                  className="font-body text-lg md:text-xl tracking-widest text-muted-foreground mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0.7] }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  Take a deep breath 🌿
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {entryStep >= 3 && (
                <motion.div
                  key="begin-btn"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-16"
                >
                  <Button
                    onClick={() => setStage("suspense")}
                    className="px-10 py-6 text-lg tracking-wider font-display bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/50 transition-all duration-500 rounded-full shadow-glow"
                    variant="ghost"
                  >
                    🎁 Begin Reveal
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ===== STAGE: SUSPENSE ===== */}
        {stage === "suspense" && (
          <motion.div
            key="suspense"
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-48 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                {TEXTS_SUSPENSE.map(
                  (text, i) =>
                    suspenseStep === i + 1 && (
                      <motion.p
                        key={text}
                        className="font-display text-xl md:text-3xl tracking-wide text-foreground/80 text-center"
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      >
                        {text}
                      </motion.p>
                    )
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {suspenseStep >= 3 && (
                <motion.div
                  key="reveal-btn"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="mt-12"
                >
                  {/* Pulsing ring */}
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-primary/30"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ margin: "-8px" }}
                    />
                    <Button
                      onClick={() => setStage("revealing")}
                      className="px-12 py-6 text-lg tracking-wider font-display bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all duration-500 rounded-full shadow-glow"
                      variant="ghost"
                    >
                      ✨ Reveal Now
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ===== STAGE: REVEALING ===== */}
        {stage === "revealing" && (
          <motion.div
            key="revealing"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Flash */}
            <motion.div
              className="absolute inset-0 bg-white/20 z-20"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />

            {/* Phone with design */}
            <motion.div
              className="relative"
              style={{
                filter: `blur(${blurAmount}px)`,
                transform: `rotateY(${rotation}deg) scale(${scale})`,
              }}
            >
              {/* Light streak */}
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: revealProgress > 0.3 ? 1 : 0 }}
              >
                <motion.div
                  className="absolute top-0 w-24 h-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(var(--foreground) / 0.3), transparent)",
                  }}
                  animate={{ left: ["-20%", "120%"] }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                />
              </motion.div>

              <img
                src={designGalaxy}
                alt="Your custom design"
                className="w-64 md:w-80 h-auto rounded-[2rem] shadow-2xl border-4 border-primary/10"
                style={{ perspective: "1000px" }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* ===== STAGE: FINAL ===== */}
        {stage === "final" && (
          <motion.div
            key="final"
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Background adaptive glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 40%, hsl(var(--primary) / 0.12), transparent 60%)`,
              }}
            />

            {/* Confetti */}
            {showConfetti && <Confetti />}

            {/* Design image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <motion.img
                src={designGalaxy}
                alt="Your custom design"
                className="w-64 md:w-80 h-auto rounded-[2rem] border-4 border-primary/10"
                style={{
                  boxShadow: "0 0 80px -20px hsl(var(--primary) / 0.25), 0 20px 60px -20px hsl(0 0% 0% / 0.15)",
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Design info */}
            <motion.div
              className="mt-10 text-center z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">
                Design ID: #SC-2031 🏷️
              </p>
              <p className="font-display text-sm tracking-wide text-foreground/50 mt-2">
                crafted with love by Riham Creates 💕
              </p>
              <p className="font-body text-xs text-muted-foreground/60 mt-1">
                Created on {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mt-10 z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Button
                className="px-8 py-5 font-display tracking-wide bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Download 📥
              </Button>
              <Button
                variant="ghost"
                className="px-8 py-5 font-display tracking-wide border border-border text-foreground hover:bg-muted rounded-full"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share 💌
              </Button>
              <Button
                variant="ghost"
                className="px-8 py-5 font-display tracking-wide border border-border text-foreground hover:bg-muted rounded-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Order Again 🔄
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reveal;
