import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import OrdersPage from "../pages/OrdersPage";
import OrderDetailPage from "../pages/OrderDetailPage";
import FilterPage from "../pages/FilterPage";
import StatsPage from "../pages/StatsPage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/orders" replace />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:id" element={<OrderDetailPage />} />
      <Route path="/filter" element={<FilterPage />} />
      <Route path="/stats" element={<StatsPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
