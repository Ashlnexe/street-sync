"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Dashboard } from "@/components/dashboard";
import { OrdersTable } from "@/components/orders-table";
import { InventoryTable } from "@/components/inventory-table";

export default function AdminPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <Dashboard refreshKey={refreshKey} onDataChanged={triggerRefresh} />
        <OrdersTable refreshKey={refreshKey} />
        <InventoryTable refreshKey={refreshKey} onProductDeleted={triggerRefresh} />
      </div>
    </AppShell>
  );
}
