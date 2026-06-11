import { supabase } from "@/lib/supabase";

/**
 * Maps a Supabase row (snake_case) to the shape the frontend expects (camelCase).
 * Prices are stored as NUMERIC in DB; we format them as "₹ X,XXX.XX" strings here.
 */
function formatProduct(row) {
  const formatPrice = (val) => {
    if (val === null || val === undefined) return null;
    return `₹ ${Number(val).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    salePrice: formatPrice(row.sale_price),
    originalPrice: formatPrice(row.original_price),
    rating: row.rating ? String(row.rating) : null,
    badges: row.badges ?? [],
    tags: row.tags ?? [],
    category: row.category,
    image: row.image,
    hoverImage: row.hover_image ?? "",
    createdAt: row.created_at,
  };
}

/**
 * Fetch all products.
 * Use in Server Components (no cache directive = default Next.js caching).
 */
export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("[getProducts] Supabase error:", error.message);
    return [];
  }

  return data.map(formatProduct);
}

/**
 * Fetch products filtered by a single tag (e.g. "BESTSELLER", "NEW IN", "END OF SEASON").
 */
export async function getProductsByTag(tag) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .contains("tags", [tag])
    .order("id", { ascending: true });

  if (error) {
    console.error(`[getProductsByTag] Supabase error for tag "${tag}":`, error.message);
    return [];
  }

  return data.map(formatProduct);
}

/**
 * Fetch products filtered by category slug (e.g. "hoodies", "tees", "waffle").
 */
export async function getProductsByCategory(category) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("id", { ascending: true });

  if (error) {
    console.error(`[getProductsByCategory] Supabase error for category "${category}":`, error.message);
    return [];
  }

  return data.map(formatProduct);
}

/**
 * Fetch a single product by its slug.
 */
export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`[getProductBySlug] Supabase error for slug "${slug}":`, error.message);
    return null;
  }

  return formatProduct(data);
}
