import { useMemo } from "react";
import { useOrder } from "../context/Ordercontext";

const isValidOrder = (order) => {
  if (!order || typeof order !== "object") {
    return false;
  }

  const items = Array.isArray(order.items) ? order.items : [];
  const hasValidItems =
    items.length > 0 && items.every((item) => Number(item?.quantity) > 0);
  const totalAmount = Number(order.totalAmount);
  const hasValidTotal = Number.isFinite(totalAmount);

  return hasValidItems && hasValidTotal;
};

const StatsPage = () => {
  const { orders } = useOrder();

  const stats = useMemo(
    () =>
      (Array.isArray(orders) ? orders : [])
        .filter(isValidOrder)
        .reduce(
          (acc, order) => {
            const status =
              typeof order.status === "string" ? order.status.toLowerCase() : "";

            acc.totalOrders += 1;

            if (status === "delivered") {
              acc.deliveredOrders += 1;
            }

            if (status === "cancelled") {
              acc.cancelledOrders += 1;
            }

            return acc;
          },
          {
            totalOrders: 0,
            deliveredOrders: 0,
            cancelledOrders: 0,
          },
        ),
    [orders],
  );

  if (typeof window !== "undefined") {
    window.appState = {
      totalOrders: stats.totalOrders,
      deliveredOrders: stats.deliveredOrders,
      cancelledOrders: stats.cancelledOrders,
    };
  }

  return (
    <section>
      <h1>Order Stats</h1>
      <div data-testid="total-orders">Total Orders:{stats.totalOrders}</div>
      <div data-testid="delivered-orders">Delivered orders:{stats.deliveredOrders}</div>
      <div data-testid="cancelled-orders">Cancelled orders:{stats.cancelledOrders}</div>
    </section>
  );
};

export default StatsPage;
