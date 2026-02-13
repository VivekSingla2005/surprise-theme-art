import { useState } from "react";
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";
import { designs as initialDesigns, categories, type Design } from "@/data/designs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const ManageDesigns = () => {
  const [designList, setDesignList] = useState<Design[]>(initialDesigns);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDesign, setEditingDesign] = useState<Design | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formCategory, setFormCategory] = useState("");

  const openNew = () => {
    setEditingDesign(null);
    setFormName("");
    setFormPrice("500");
    setFormCategory("Anime");
    setDialogOpen(true);
  };

  const openEdit = (d: Design) => {
    setEditingDesign(d);
    setFormName(d.name);
    setFormPrice(String(d.price));
    setFormCategory(d.category);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (editingDesign) {
      setDesignList((prev) =>
        prev.map((d) =>
          d.id === editingDesign.id
            ? { ...d, name: formName, price: Number(formPrice), category: formCategory }
            : d
        )
      );
    } else {
      const newDesign: Design = {
        id: String(Date.now()),
        name: formName,
        price: Number(formPrice),
        category: formCategory,
        image: "/placeholder.svg",
      };
      setDesignList((prev) => [...prev, newDesign]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setDesignList((prev) => prev.filter((d) => d.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Manage Designs</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Add, edit, or remove ready-made designs
          </p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" /> Add Design
        </Button>
      </div>

      {/* Design Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {designList.map((d) => (
          <div
            key={d.id}
            className="group relative overflow-hidden rounded-xl border border-border bg-card"
          >
            <div className="aspect-square overflow-hidden bg-secondary">
              <img
                src={d.image}
                alt={d.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100">
              <Button size="sm" variant="outline" onClick={() => openEdit(d)} className="gap-1.5">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => setDeleteConfirm(d.id)}
                className="gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </Button>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{d.name}</h3>
                  <span className="text-xs text-muted-foreground">{d.category}</span>
                </div>
                <span className="text-gradient font-display font-bold">₹{d.price}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Add new placeholder */}
        <button
          onClick={openNew}
          className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-card/50 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Upload className="h-8 w-8" />
          <span className="text-sm font-medium">Upload New Design</span>
        </button>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle className="font-display">
              {editingDesign ? "Edit Design" : "Add New Design"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Image upload placeholder */}
            <div className="flex aspect-video items-center justify-center rounded-lg border-2 border-dashed border-border bg-secondary/50 text-muted-foreground">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 mb-2" />
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-xs">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Design Name</label>
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="e.g. Neon Galaxy"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Price (₹)</label>
                <Input
                  type="number"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  placeholder="500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {categories.filter((c) => c !== "All").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingDesign ? "Save Changes" : "Add Design"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="bg-card sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Delete Design?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone. The design will be permanently removed.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleDelete(deleteConfirm!)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageDesigns;
