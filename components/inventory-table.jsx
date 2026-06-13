"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

export function InventoryTable({ refreshKey = 0, onProductDeleted }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("[InventoryTable] fetch error:", err);
        setErrorMsg(err.message || "Failed to fetch products.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [refreshKey]);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to permanently delete this product?")) return;
    
    setDeletingId(productId);
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;
      
      // Update local state and trigger parent refresh
      setProducts(prev => prev.filter(p => p.id !== productId));
      onProductDeleted?.();
    } catch (err) {
      console.error("[InventoryTable] delete error:", err);
      alert("Failed to delete product: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Card className="col-span-full border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md">
      <CardHeader className="px-6 py-5">
        <CardTitle className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Inventory Catalog
        </CardTitle>
        <CardDescription className="text-neutral-500 dark:text-neutral-400 text-sm">
          Manage all live products across collections.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6 md:pt-0">
        {isLoading ? (
          <div className="p-10 flex justify-center text-neutral-500">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : errorMsg ? (
          <div className="p-6 text-sm text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/10 border border-red-200/50 dark:border-red-900/50 rounded-lg mx-6 mb-6">
            Failed to fetch live inventory: {errorMsg}
          </div>
        ) : products.length === 0 ? (
          <div className="p-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
            No products found in the catalog. Launch a new drop to get started.
          </div>
        ) : (
          <div className="w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-neutral-100 dark:border-neutral-800">
                  <TableHead className="w-[80px] font-bold text-neutral-800 dark:text-neutral-200">Image</TableHead>
                  <TableHead className="font-bold text-neutral-800 dark:text-neutral-200">Title</TableHead>
                  <TableHead className="font-bold text-neutral-800 dark:text-neutral-200">Category</TableHead>
                  <TableHead className="font-bold text-neutral-800 dark:text-neutral-200">Price</TableHead>
                  <TableHead className="w-[100px] text-right font-bold text-neutral-800 dark:text-neutral-200">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors border-neutral-100 dark:border-neutral-800">
                    <TableCell>
                      <div className="relative w-10 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-md overflow-hidden">
                        {product.image ? (
                           <img 
                             src={product.image} 
                             alt={product.title}
                             className="object-cover w-full h-full"
                           />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">No Img</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-neutral-900 dark:text-neutral-100">
                      {product.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {product.sale_price}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                        disabled={deletingId === product.id}
                        onClick={() => handleDelete(product.id)}
                        aria-label="Delete product"
                      >
                        {deletingId === product.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
