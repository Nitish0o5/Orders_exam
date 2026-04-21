import { useMemo, useState } from "react";
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

const FilterPage = () => {
  const { orders } = useOrder();
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validOrders = useMemo(
    () => (Array.isArray(orders) ? orders : []).filter(isValidOrder),
    [orders],
  );
  const normalizedSearch = search.trim().toLowerCase();

  const filteredOrders = useMemo(
    () =>
      validOrders.filter((order) =>
        String(order.restaurant || "").toLowerCase().includes(normalizedSearch),
      ),
    [normalizedSearch, validOrders],
  );

  const showInputError = submitted && normalizedSearch.length === 0;
  const showNoResults = submitted && normalizedSearch.length > 0 && filteredOrders.length === 0;

  return (
    <section>
      <h1>Filter Orders</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter restaurant"
        />
        <button type="submit">Search</button>
      </form>

      {showInputError ? <p>Please enter a restaurant name</p> : null}
      {showNoResults ? <p>No results found</p> : null}

      {submitted && !showInputError && filteredOrders.length > 0 ? (
        <ul>
          {filteredOrders.map((order) => (
            <OrderItem key={order.orderId} order={order} />
          ))}
        </ul>
      ) : null}
    </section>
  );
};

export default FilterPage;
