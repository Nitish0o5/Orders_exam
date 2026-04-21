import { useMemo } from "react";
import { useOrder } from "../context/Ordercontext";
import OrderItem from "../components/OrderItem";

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

const OrdersPage = () => {
  const { orders, loading, dispatch } = useOrder();

  const validOrders = useMemo(
    () => (Array.isArray(orders) ? orders : []).filter(isValidOrder),
    [orders],
  );

  const pendingOrders = useMemo(
    () =>
      validOrders.filter(
        (order) => (order.status || "").toLowerCase() !== "delivered",
      ),
    [validOrders],
  );

  const markDelivered = (orderId) => {
    dispatch({ type: "MARK_DELIVERED", payload: orderId });
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <section>
      <h1>Valid Orders</h1>
      <ul>
        {pendingOrders.map((order) => (
          <OrderItem
            key={order.orderId}
            order={order}
            onMarkDelivered={markDelivered}
          />
        ))}
      </ul>
    </section>
  );
};

export default OrdersPage;
