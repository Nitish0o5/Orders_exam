const OrderItem = ({ order, onMarkDelivered }) => {
  const customerName = order.customerName || "Unknown";

  return (
    <li data-testid="order-item">
      <p>Order ID: {order.orderId}</p>
      <p>Customer: {customerName}</p>
      <p>Restaurant: {order.restaurant}</p>
      <p>Status: {order.status || "N/A"}</p>
      {order.rating != null ? <p>Rating: {order.rating}</p> : null}
      {typeof onMarkDelivered === "function" ? (
        <button type="button" onClick={() => onMarkDelivered(order.orderId)}>
          Mark Delivered
        </button>
      ) : null}
    </li>
  );
};

export default OrderItem;
