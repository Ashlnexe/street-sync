import { supabase } from "@/lib/supabase";

/**
 * Fetch KPI stats from orders table:
 * - Total revenue
 * - Total order count
 * - Average order value
 * Returns both current and prior 30-day windows for delta calculation.
 */
export async function getDashboardStats() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
  const sixtyDaysAgo = new Date(now - 60 * 24 * 60 * 60 * 1000).toISOString();

  // Current period: last 30 days
  const { data: current, error: currentError } = await supabase
    .from("orders")
    .select("total_amount")
    .eq("status", "completed")
    .gte("created_at", thirtyDaysAgo);

  // Prior period: 31–60 days ago
  const { data: prior, error: priorError } = await supabase
    .from("orders")
    .select("total_amount")
    .eq("status", "completed")
    .gte("created_at", sixtyDaysAgo)
    .lt("created_at", thirtyDaysAgo);

  if (currentError || priorError) {
    console.error("[getDashboardStats] error:", currentError?.message ?? priorError?.message);
  }

  const sumAmount = (rows) => (rows ?? []).reduce((s, r) => s + Number(r.total_amount), 0);
  const countOrders = (rows) => (rows ?? []).length;

  const currentRevenue = sumAmount(current);
  const priorRevenue = sumAmount(prior);
  const currentOrders = countOrders(current);
  const priorOrders = countOrders(prior);
  const currentAOV = currentOrders > 0 ? currentRevenue / currentOrders : 0;
  const priorAOV = priorOrders > 0 ? priorRevenue / priorOrders : 0;

  const pctDelta = (curr, prev) =>
    prev === 0 ? 0 : Number((((curr - prev) / prev) * 100).toFixed(1));

  return [
    {
      label: "Total revenue",
      value: `₹ ${currentRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      delta: pctDelta(currentRevenue, priorRevenue),
      hint: "vs prior 30 days",
    },
    {
      label: "Orders",
      value: currentOrders.toLocaleString("en-IN"),
      delta: pctDelta(currentOrders, priorOrders),
      hint: "vs prior 30 days",
    },
    {
      label: "Average order value",
      value: `₹ ${currentAOV.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      delta: pctDelta(currentAOV, priorAOV),
      hint: "vs prior 30 days",
    },
    {
      label: "Total products",
      value: "—", // filled in by getDashboardCategoryData
      delta: 0,
      hint: "in catalogue",
    },
  ];
}

/**
 * Fetch daily revenue aggregates for the revenue area chart.
 * Returns array of { date: "YYYY-MM-DD", revenue: number } for the last 90 days,
 * back-filled with the static demo data for days with no orders.
 */
export async function getRevenueChartData() {
  const { revenueChartDemo } = await import("@/components/revenue-chart-data");

  const { data, error } = await supabase
    .from("orders")
    .select("total_amount, created_at")
    .eq("status", "completed")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[getRevenueChartData] error:", error.message);
    return revenueChartDemo; // graceful fallback to demo data
  }

  if (!data || data.length === 0) return revenueChartDemo;

  // Aggregate by calendar date
  const byDate = {};
  for (const row of data) {
    const date = row.created_at.slice(0, 10); // "YYYY-MM-DD"
    byDate[date] = (byDate[date] ?? 0) + Number(row.total_amount);
  }

  // Merge live data on top of the demo timeline (live overrides demo for same dates)
  const merged = revenueChartDemo.map((row) => ({
    date: row.date,
    revenue: byDate[row.date] ?? row.revenue,
  }));

  // Append any live dates not in the demo range
  for (const [date, revenue] of Object.entries(byDate)) {
    if (!merged.find((r) => r.date === date)) {
      merged.push({ date, revenue });
    }
  }

  merged.sort((a, b) => a.date.localeCompare(b.date));
  return merged;
}

/**
 * Fetch product count per category for the pie chart.
 * Returns array of { category: string, share: number } where share is percentage.
 */
export async function getDashboardCategoryData() {
  const { data, error } = await supabase
    .from("products")
    .select("category");

  if (error) {
    console.error("[getDashboardCategoryData] error:", error.message);
    return [];
  }

  const counts = {};
  for (const row of data) {
    counts[row.category] = (counts[row.category] ?? 0) + 1;
  }

  const total = Object.values(counts).reduce((s, v) => s + v, 0);
  if (total === 0) return [];

  return Object.entries(counts).map(([category, count]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    share: Math.round((count / total) * 100),
  }));
}
