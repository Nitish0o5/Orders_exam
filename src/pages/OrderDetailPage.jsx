import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useOrder } from "../context/Ordercontext";

const OrderDetailPage = () => {
  const { id } = useParams();
  const { orders } = useOrder();

  const selectedOrder = useMemo(
    () => (Array.isArray(orders) ? orders : []).find((order) => String(order.orderId) === id),
    [id, orders],
  );

  if (!selectedOrder) {
    return <p>Order not found</p>;
  }

  const items = Array.isArray(selectedOrder.items) ? selectedOrder.items : [];

  return (
    <section>
      <h1>Order Details</h1>
      <p>orderId: {selectedOrder.orderId}</p>
      <p>customerName: {selectedOrder.customerName || "Unknown"}</p>
      <p>restaurant: {selectedOrder.restaurant || "N/A"}</p>
      <p>totalAmount: {selectedOrder.totalAmount ?? "N/A"}</p>

      <h2>Items</h2>
      <ul>
        {items.map((item, index) => {
          const price = Number(item?.price) || 0;
          const quantity = Number(item?.quantity) || 0;

          return (
            <li key={`${item?.name || "item"}-${index}`} data-testid="order-item">
              {item?.name || "Unknown Item"} - subtotal: {price * quantity}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default OrderDetailPage;
