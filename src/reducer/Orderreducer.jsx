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

const OrderReducer = (state, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return {
        ...state,
        orders: Array.isArray(action.payload) ? action.payload : [],
        loading: false,
      };

    case "MARK_DELIVERED":
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.orderId !== action.payload) {
            return order;
          }

          if (!isValidOrder(order)) {
            return order;
          }

          if ((order.status || "").toLowerCase() === "delivered") {
            return order;
          }

          return { ...order, status: "Delivered" };
        }),
      };

    default:
      console.warn("Unknown action:", action.type);
      return state;
  }
};

export default OrderReducer;
