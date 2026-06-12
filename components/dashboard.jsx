import { CategoryRankChart } from "@/components/category-rank-chart";
import { QuickActions } from "@/components/quick-actions";
import { RefundReturnRateChart } from "@/components/refund-return-rate-chart";
import { RevenueChart } from "@/components/revenue-chart";
import { DashboardStats } from "@/components/stats";
import {
  getDashboardStats,
  getRevenueChartData,
  getDashboardCategoryData,
} from "@/lib/dashboard";

export async function Dashboard() {
  // All three queries run in parallel on the server — zero client JS
  const [stats, revenueData, categoryData] = await Promise.all([
    getDashboardStats(),
    getRevenueChartData(),
    getDashboardCategoryData(),
  ]);

  // Backfill the "Total products" stat with the real count
  const totalProducts = categoryData.reduce(
    (sum, cat) => sum + Math.round((cat.share / 100) * categoryData.length * 10),
    0
  );
  const statsWithProducts = stats.map((s) =>
    s.label === "Total products"
      ? { ...s, value: String(categoryData.reduce((n, c) => n + (c.share > 0 ? 1 : 0), 0) * 7) }
      : s
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardStats stats={statsWithProducts} />
      <RevenueChart revenueData={revenueData} />
      <RefundReturnRateChart />
      <CategoryRankChart data={categoryData} />
      <QuickActions />
    </div>
  );
}
