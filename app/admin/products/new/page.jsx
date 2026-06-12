"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Plus, Sparkles, Check } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  const router = useRouter();

  // Loading & notification states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Product field states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("tees");
  const [imageUrl, setImageUrl] = useState("");
  const [hoverImageUrl, setHoverImageUrl] = useState("");
  const [rating, setRating] = useState("0.0");
  const [badgesInput, setBadgesInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  // Sync title and slug input
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    const slugified = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric except spaces/hyphens
      .trim()
      .replace(/\s+/g, "-") // spaces to hyphens
      .replace(/-+/g, "-"); // merge duplicate hyphens
    setSlug(slugified);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!title || !slug || !salePrice || !category || !imageUrl) {
      setErrorMsg("Please fill in all required fields marked with *.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    // Split CSV values into trimmed arrays
    const badges = badgesInput
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    const tags = tagsInput
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    try {
      const { data, error } = await supabase.from("products").insert([
        {
          title,
          slug,
          sale_price: parseFloat(salePrice),
          original_price: originalPrice ? parseFloat(originalPrice) : null,
          category,
          image_url: imageUrl,
          hover_image_url: hoverImageUrl || null,
          rating: parseFloat(rating) || 0.0,
          badges,
          tags,
        },
      ]);

      if (error) {
        console.error("[NewProduct] insertion error:", error.message);
        setErrorMsg(error.message || "Failed to create product. Ensure the slug is unique.");
        setIsLoading(false);
        return;
      }

      setSuccessMsg("Product successfully launched!");
      setTimeout(() => {
        router.push("/admin");
      }, 1200);
    } catch (err) {
      console.error("[NewProduct] unexpected error:", err);
      setErrorMsg("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full py-4 md:py-6">
        {/* Navigation Breadcrumb & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Product Creation Card */}
        <Card className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md">
          <CardHeader className="border-b border-neutral-100 dark:border-neutral-800 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-900 dark:text-white">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Add New Product Drop
                </CardTitle>
                <CardDescription className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                  Define specifications, pricing, imagery, and tags to launch a new catalog item.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Error feedback */}
              {errorMsg && (
                <div className="p-4 text-sm text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/10 border border-red-200/50 dark:border-red-900/50 rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Success feedback */}
              {successMsg && (
                <div className="p-4 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200/50 dark:border-emerald-900/50 rounded-lg flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Product Title *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    required
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="e.g. Vintage Oversized Tee"
                    className="border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>

                {/* Slug / Route path */}
                <div className="space-y-2">
                  <Label htmlFor="slug" className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-2">
                    <span>Product Slug *</span>
                    <Sparkles className="w-3 h-3 text-neutral-400" />
                  </Label>
                  <Input
                    id="slug"
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. vintage-oversized-tee"
                    className="font-mono text-sm border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>

                {/* Sale Price */}
                <div className="space-y-2">
                  <Label htmlFor="salePrice" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Sale Price (₹) *
                  </Label>
                  <Input
                    id="salePrice"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="2499.00"
                    className="border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>

                {/* Original Price */}
                <div className="space-y-2">
                  <Label htmlFor="originalPrice" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Original Price (₹)
                  </Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="2999.00 (optional)"
                    className="border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>

                {/* Category selector */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Category *
                  </Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-transparent border border-neutral-200 focus:border-neutral-900 rounded-lg outline-none focus:ring-1 focus:ring-neutral-900 transition-all dark:bg-neutral-950 dark:border-neutral-800 dark:focus:border-neutral-50 dark:focus:ring-neutral-50"
                  >
                    <option value="hoodies">Hoodies</option>
                    <option value="tees">Tees</option>
                    <option value="waffle">Waffle Knits</option>
                    <option value="jackets">Jackets</option>
                    <option value="pants">Pants</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <Label htmlFor="rating" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Initial Rating
                  </Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="4.5"
                    className="border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Primary Image URL *
                  </Label>
                  <Input
                    id="imageUrl"
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/images/products/tee-front.jpg"
                    className="border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>

                {/* Hover Image URL */}
                <div className="space-y-2">
                  <Label htmlFor="hoverImageUrl" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Hover Image URL
                  </Label>
                  <Input
                    id="hoverImageUrl"
                    type="text"
                    value={hoverImageUrl}
                    onChange={(e) => setHoverImageUrl(e.target.value)}
                    placeholder="/images/products/tee-back.jpg (optional)"
                    className="border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>

                {/* Badges */}
                <div className="space-y-2">
                  <Label htmlFor="badges" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Badges (comma-separated)
                  </Label>
                  <Input
                    id="badges"
                    type="text"
                    value={badgesInput}
                    onChange={(e) => setBadgesInput(e.target.value)}
                    placeholder="NEW IN, BESTSELLER"
                    className="border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags" className="font-semibold text-neutral-700 dark:text-neutral-300">
                    Tags (comma-separated)
                  </Label>
                  <Input
                    id="tags"
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="oversized, heavyweight, streetwear"
                    className="border-neutral-200 dark:border-neutral-800 dark:bg-neutral-950"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                <Link href="/admin">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    className="border-neutral-200 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-850"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  id="product-submit-btn"
                  type="submit"
                  disabled={isLoading}
                  className="bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Launching Product...</span>
                    </>
                  ) : (
                    <span>Create Product</span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
