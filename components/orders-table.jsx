import { createClient } from "@/lib/supabase/server";
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

export async function OrdersTable() {
  let orders = [];
  let errorMsg = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("[OrdersTable] fetch error:", error.message);
      errorMsg = error.message;
    } else {
      orders = data || [];
    }
  } catch (err) {
    console.error("[OrdersTable] unexpected error:", err);
    errorMsg = err.message || "An unexpected error occurred.";
  }

  // Status badge helpers with curated streetwear palette accents
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
        {errorMsg ? (
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
                  <TableHead className="font-bold text-center w-[120px] text-neutral-800 dark:text-neutral-200">Status</TableHead>
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
                        {getStatusBadge(order.status)}
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
