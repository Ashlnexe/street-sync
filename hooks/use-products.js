"use client";
import { useState, useEffect } from "react";
import { getProducts, getProductsByTag, getProductsByCategory, getProductBySlug } from "@/lib/products";

/**
 * Fetches all products for use in Client Components.
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

/**
 * Fetches products filtered by a tag for use in Client Components.
 */
export function useProductsByTag(tag) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tag) return;
    getProductsByTag(tag)
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [tag]);

  return { products, loading, error };
}

/**
 * Fetches products filtered by category for use in Client Components.
 */
export function useProductsByCategory(category) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;
    getProductsByCategory(category)
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [category]);

  return { products, loading, error };
}

/**
 * Fetches a single product by slug for use in Client Components.
 */
export function useProductBySlug(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    getProductBySlug(slug)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { product, loading, error };
}
