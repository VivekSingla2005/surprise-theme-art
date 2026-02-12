import { Sparkles } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card py-12">
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-display text-lg font-bold text-foreground">
            Cover<span className="text-gradient">Craft</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          You imagine. We surprise. Premium custom phone covers crafted with love.
        </p>
        <p className="text-xs text-muted-foreground/60">
          © 2026 CoverCraft. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
