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
import { Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function OrdersTable({ refreshKey = 0 }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50);

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error("[OrdersTable] fetch error:", err);
        setErrorMsg(err.message || "Failed to fetch orders.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, [refreshKey]);

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;
      
      // Optimistic update
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (err) {
      console.error("[OrdersTable] status update error:", err);
      alert("Failed to update status: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "completed" || s === "paid" || s === "delivered" || s === "success") {
      return (
        <Badge className="bg-emerald-500/10 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 capitalize font-semibold rounded-full px-2.5 py-0.5">
          {s}
        </Badge>
      );
    }
    if (s === "pending" || s === "processing" || s === "hold") {
      return (
        <Badge className="bg-amber-500/10 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 capitalize font-semibold rounded-full px-2.5 py-0.5">
          {s}
        </Badge>
      );
    }
    if (s === "failed" || s === "cancelled" || s === "refunded") {
      return (
        <Badge variant="destructive" className="capitalize font-semibold rounded-full px-2.5 py-0.5">
          {s}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="capitalize font-semibold rounded-full px-2.5 py-0.5">
        {s}
      </Badge>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const formatAmount = (amount) => {
    const amt = Number(amount) || 0;
    return `₹ ${amt.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <Card className="col-span-full border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-md">
      <CardHeader className="px-6 py-5">
        <CardTitle className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Recent Orders
        </CardTitle>
        <CardDescription className="text-neutral-500 dark:text-neutral-400 text-sm">
          Monitor store purchases, order volume, and fulfillment status in real-time.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6 md:pt-0">
        {isLoading ? (
          <div className="p-10 flex justify-center text-neutral-500">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : errorMsg ? (
          <div className="p-6 text-sm text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-950/10 border border-red-200/50 dark:border-red-900/50 rounded-lg mx-6 mb-6">
            Failed to fetch live orders from database: {errorMsg}
          </div>
        ) : orders.length === 0 ? (
          <div className="p-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
            No orders found in the system yet.
          </div>
        ) : (
          <div className="w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-neutral-100 dark:border-neutral-800">
                  <TableHead className="w-[120px] font-bold text-neutral-800 dark:text-neutral-200">Order ID</TableHead>
                  <TableHead className="font-bold text-neutral-800 dark:text-neutral-200">Customer Email</TableHead>
                  <TableHead className="font-bold text-neutral-800 dark:text-neutral-200">Date</TableHead>
                  <TableHead className="font-bold text-right text-neutral-800 dark:text-neutral-200">Amount</TableHead>
                  <TableHead className="font-bold text-center w-[160px] text-neutral-800 dark:text-neutral-200">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const displayId = String(order.id).length > 8 
                    ? `#${String(order.id).slice(0, 8)}...` 
                    : `#${order.id}`;
                  return (
                    <TableRow key={order.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors border-neutral-100 dark:border-neutral-800">
                      <TableCell className="font-mono text-xs font-semibold text-neutral-600 dark:text-neutral-300">
                        {displayId}
                      </TableCell>
                      <TableCell className="font-medium text-neutral-900 dark:text-neutral-100">
                        {order.customer_email || "—"}
                      </TableCell>
                      <TableCell className="text-neutral-500 dark:text-neutral-400 text-sm">
                        {formatDate(order.created_at)}
                      </TableCell>
                      <TableCell className="text-right font-bold text-neutral-900 dark:text-white">
                        {formatAmount(order.total_amount)}
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger render={<button className="outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full w-full" disabled={updatingId === order.id} />}>
                            {updatingId === order.id ? (
                                <Loader2 className="w-4 h-4 animate-spin mx-auto text-neutral-500" />
                            ) : (
                                getStatusBadge(order.status)
                            )}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'pending')}>Mark as Pending</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'processing')}>Mark as Processing</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'completed')}>Mark as Completed</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateOrderStatus(order.id, 'cancelled')} className="text-red-600">Mark as Cancelled</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
