"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CategoryRankChart } from "@/components/category-rank-chart";
import { QuickActions } from "@/components/quick-actions";
import { RefundReturnRateChart } from "@/components/refund-return-rate-chart";
import { RevenueChart } from "@/components/revenue-chart";
import { DashboardStats } from "@/components/stats";

// ---------------------------------------------------------------------------
// Demo data – shown when there are no real orders/products in the database.
// ---------------------------------------------------------------------------
function buildDemoRevenueData() {
  const rows = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  // 90 days of realistic-looking data with an upward trend + noise
  for (let i = 89; i >= 0; i--) {
    const d = new Date(base);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay();
    const trend = (89 - i) * 180;                          // gentle growth
    const weekendBump = dayOfWeek === 0 || dayOfWeek === 6 ? 3200 : 0;
    const noise = Math.sin(i * 2.3) * 1800 + Math.cos(i * 1.1) * 900;
    const revenue = Math.max(800, Math.round(8500 + trend + weekendBump + noise));
    rows.push({ date: d.toISOString().slice(0, 10), revenue });
  }
  return rows;
}

const DEMO_REVENUE   = buildDemoRevenueData();
const DEMO_STATS = [
  { label: "Total revenue",        value: "₹ 4,37,820.00", delta: 12.4,  hint: "vs prior 30 days" },
  { label: "Orders",               value: "1,284",          delta: 8.1,   hint: "vs prior 30 days" },
  { label: "Average order value",  value: "₹ 341.00",       delta: -2.3,  hint: "vs prior 30 days" },
  { label: "Total products",       value: "87",             delta: 0,     hint: "in catalogue"     },
];
const DEMO_CATEGORIES = [
  { category: "Streetwear",   share: 38 },
  { category: "Footwear",     share: 27 },
  { category: "Accessories",  share: 18 },
  { category: "Outerwear",    share: 11 },
  { category: "Others",       share: 6  },
];

export function Dashboard({ refreshKey = 0, onDataChanged }) {
  const [stats, setStats]             = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isDemo, setIsDemo]           = useState(false);

  useEffect(() => {
    async function loadDashboardData() {
      // 1. Fetch Orders
      const now = new Date();
      const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();
      const sixtyDaysAgo  = new Date(now - 60 * 24 * 60 * 60 * 1000).toISOString();

      const { data: currentOrders } = await supabase
        .from("orders")
        .select("total_amount, created_at")
        .eq("status", "completed")
        .gte("created_at", thirtyDaysAgo);

      const { data: priorOrders } = await supabase
        .from("orders")
        .select("total_amount")
        .eq("status", "completed")
        .gte("created_at", sixtyDaysAgo)
        .lt("created_at", thirtyDaysAgo);

      const { data: products } = await supabase.from("products").select("category");

      const hasRealData = (currentOrders?.length ?? 0) + (priorOrders?.length ?? 0) > 0;

      // ── No real data → use demo ──────────────────────────────────────────
      if (!hasRealData) {
        setIsDemo(true);
        setStats(DEMO_STATS);
        setRevenueData(DEMO_REVENUE);
        setCategoryData(DEMO_CATEGORIES);
        return;
      }

      // ── Real data ────────────────────────────────────────────────────────
      setIsDemo(false);

      const sumAmount = (rows) => (rows ?? []).reduce((s, r) => s + Number(r.total_amount), 0);
      const currentRevenue = sumAmount(currentOrders);
      const priorRevenue   = sumAmount(priorOrders);
      const currCount      = (currentOrders || []).length;
      const priorCount     = (priorOrders  || []).length;
      const currAOV        = currCount  > 0 ? currentRevenue / currCount  : 0;
      const priorAOV       = priorCount > 0 ? priorRevenue  / priorCount : 0;
      const productCount   = (products  || []).length;

      const pctDelta = (curr, prev) =>
        prev === 0 ? 0 : Number((((curr - prev) / prev) * 100).toFixed(1));

      // Category breakdown
      const catCounts = {};
      (products || []).forEach(p => {
        catCounts[p.category] = (catCounts[p.category] || 0) + 1;
      });
      const catData = Object.entries(catCounts).map(([cat, count]) => ({
        category: cat.charAt(0).toUpperCase() + cat.slice(1),
        share: Math.round((count / productCount) * 100),
      }));

      // Revenue chart
      const byDate = {};
      (currentOrders || []).forEach(row => {
        const d = row.created_at.slice(0, 10);
        byDate[d] = (byDate[d] || 0) + Number(row.total_amount);
      });
      const revChart = Object.entries(byDate)
        .map(([date, revenue]) => ({ date, revenue }))
        .sort((a, b) => a.date.localeCompare(b.date));

      setStats([
        {
          label: "Total revenue",
          value: `₹ ${currentRevenue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          delta: pctDelta(currentRevenue, priorRevenue),
          hint: "vs prior 30 days",
        },
        {
          label: "Orders",
          value: currCount.toLocaleString("en-IN"),
          delta: pctDelta(currCount, priorCount),
          hint: "vs prior 30 days",
        },
        {
          label: "Average order value",
          value: `₹ ${currAOV.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          delta: pctDelta(currAOV, priorAOV),
          hint: "vs prior 30 days",
        },
        {
          label: "Total products",
          value: String(productCount),
          delta: 0,
          hint: "in catalogue",
        },
      ]);
      setCategoryData(catData);
      setRevenueData(revChart.length > 0 ? revChart : [{ date: new Date().toISOString().slice(0, 10), revenue: 0 }]);
    }

    loadDashboardData();
  }, [refreshKey]);

  return (
    <div className="space-y-1">
      {isDemo && (
        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium px-1 pb-1">
          ⚡ Showing demo data — add real orders to see live stats.
        </p>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.length > 0
          ? <DashboardStats stats={stats} />
          : <div className="col-span-full h-32 animate-pulse bg-neutral-100 dark:bg-neutral-800 rounded-xl" />}
        <RevenueChart revenueData={revenueData} />
        <RefundReturnRateChart />
        <CategoryRankChart data={categoryData} />
        <QuickActions onProductAdded={onDataChanged} />
      </div>
    </div>
  );
}
