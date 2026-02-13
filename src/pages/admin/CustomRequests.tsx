import { useState } from "react";
import { Upload, Eye, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface CustomRequest {
  id: string;
  customer: string;
  phone: string;
  model: string;
  phoneColor: string;
  theme: string;
  vibes: string[];
  status: string;
  date: string;
  finalDesign?: string;
}

const mockRequests: CustomRequest[] = [
  { id: "CR-001", customer: "Priya Mehta", phone: "+91 87654 32109", model: "Samsung S24", phoneColor: "Black", theme: "Dark anime with red highlights and mysterious vibe", vibes: ["Dark", "Bold"], status: "Designing", date: "2026-02-11" },
  { id: "CR-002", customer: "Sneha Das", phone: "+91 65432 10987", model: "iPhone 14", phoneColor: "White", theme: "Nature, mountains, green aesthetic, peaceful feeling", vibes: ["Aesthetic", "Minimal"], status: "Pending", date: "2026-02-09" },
  { id: "CR-003", customer: "Ananya Roy", phone: "+91 43210 98765", model: "Pixel 8", phoneColor: "Blue", theme: "Space exploration theme with purple galaxies and stars", vibes: ["Dark", "Emotional"], status: "Completed", date: "2026-02-07", finalDesign: "/placeholder.svg" },
  { id: "CR-004", customer: "Ravi Teja", phone: "+91 32109 87654", model: "OnePlus 12", phoneColor: "Green", theme: "Retro gaming nostalgia with pixel art and neon colors", vibes: ["Bold", "Funny"], status: "Pending", date: "2026-02-06" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-400",
  Designing: "bg-blue-500/20 text-blue-400",
  Completed: "bg-green-500/20 text-green-400",
};

const CustomRequests = () => {
  const [requests] = useState(mockRequests);
  const [viewReq, setViewReq] = useState<CustomRequest | null>(null);
  const [uploadDialog, setUploadDialog] = useState<string | null>(null);

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Custom Requests</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View customer theme submissions and upload final designs
        </p>
      </div>

      {/* Cards layout */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {requests.map((r) => (
          <div key={r.id} className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{r.id}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[r.status]}`}>
                {r.status}
              </span>
            </div>

            <h3 className="font-display font-semibold text-foreground">{r.customer}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {r.model} · {r.phoneColor} · {r.date}
            </p>

            <div className="mt-3 rounded-lg bg-secondary/50 p-3">
              <p className="text-xs text-muted-foreground">Theme</p>
              <p className="mt-0.5 text-sm text-foreground line-clamp-2">{r.theme}</p>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              {r.vibes.map((v) => (
                <span key={v} className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                  {v}
                </span>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 gap-1.5" onClick={() => setViewReq(r)}>
                <Eye className="h-3.5 w-3.5" /> View
              </Button>
              {r.status !== "Completed" && (
                <Button size="sm" className="flex-1 gap-1.5" onClick={() => setUploadDialog(r.id)}>
                  <Upload className="h-3.5 w-3.5" /> Upload Design
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!viewReq} onOpenChange={() => setViewReq(null)}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="font-display">Request {viewReq?.id}</DialogTitle>
          </DialogHeader>
          {viewReq && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground">Customer</p>
                  <p className="font-medium text-foreground">{viewReq.customer}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">{viewReq.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone Model</p>
                  <p className="font-medium text-foreground">{viewReq.model}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone Color</p>
                  <p className="font-medium text-foreground">{viewReq.phoneColor}</p>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground">Theme Description</p>
                <p className="mt-1 rounded-lg bg-secondary/50 p-3 font-medium text-foreground">{viewReq.theme}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Vibes</p>
                <div className="mt-1 flex gap-1.5">
                  {viewReq.vibes.map((v) => (
                    <span key={v} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              {viewReq.finalDesign && (
                <div>
                  <p className="text-muted-foreground">Final Design</p>
                  <img src={viewReq.finalDesign} alt="Final design" className="mt-2 rounded-lg border border-border" />
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={!!uploadDialog} onOpenChange={() => setUploadDialog(null)}>
        <DialogContent className="bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Upload Final Design</DialogTitle>
          </DialogHeader>
          <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 text-muted-foreground">
            <div className="text-center">
              <Upload className="mx-auto mb-2 h-8 w-8" />
              <p className="text-sm font-medium">Click to upload design</p>
              <p className="text-xs">PNG, JPG up to 10MB</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialog(null)}>Cancel</Button>
            <Button onClick={() => setUploadDialog(null)}>Upload & Mark Complete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomRequests;
