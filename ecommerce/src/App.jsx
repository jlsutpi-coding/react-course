import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";
import OrdersPage from "./pages/OrdersPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  );
}

export default App;
