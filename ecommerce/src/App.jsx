import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import TrackingPage from "./pages/TrackingPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/tracking" element={<TrackingPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
