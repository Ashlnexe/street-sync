import { AppShell } from "@/components/app-shell";
import { Dashboard } from "@/components/dashboard";
import { OrdersTable } from "@/components/orders-table";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard — Street Sync™",
  description: "Internal admin panel for managing Street Sync inventory, orders, and analytics.",
};

export default function AdminPage() {
  return (
    <AppShell>
      <Dashboard />
      <OrdersTable />
    </AppShell>
  );
}
