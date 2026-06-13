"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function NewDropModal({ isOpen, onClose, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sale_price: "",
    original_price: "",
    category: "men",
    image: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const slug = generateSlug(formData.title);
      
      const { data, error } = await supabase.from("products").insert([
        {
          title: formData.title,
          slug,
          description: formData.description,
          sale_price: `₹ ${formData.sale_price}`,
          original_price: formData.original_price ? `₹ ${formData.original_price}` : null,
          category: formData.category,
          image: formData.image || null,
          tags: ["NEW IN"],
        }
      ]);

      if (error) throw error;
      
      // Reset and close
      setFormData({
        title: "",
        description: "",
        sale_price: "",
        original_price: "",
        category: "men",
        image: "",
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to launch drop. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Launch New Drop</SheetTitle>
          <SheetDescription>
            Publish a new product directly to the live catalog.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {errorMsg && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {errorMsg}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Product Title</Label>
            <Input id="title" value={formData.title} onChange={handleChange} required placeholder="e.g. OVERSIZED VINTAGE TEE" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="men">Menswear</option>
              <option value="women">Womenswear</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sale_price">Sale Price (₹)</Label>
              <Input id="sale_price" type="number" value={formData.sale_price} onChange={handleChange} required placeholder="1499" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="original_price">Original Price (₹)</Label>
              <Input id="original_price" type="number" value={formData.original_price} onChange={handleChange} placeholder="Optional (e.g. 1999)" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input id="image" type="url" value={formData.image} onChange={handleChange} placeholder="/products/new-item.jpg or https://..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Product details, fabric, fit..." rows={4} />
          </div>

          <div className="pt-4">
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Drop"
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
