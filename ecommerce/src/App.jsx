import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import TrackingPage from "./pages/TrackingPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect, useState } from "react";
import axios from "axios";
import OrdersPage from "./pages/orders/OrdersPage";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage loadCart={loadCart} cart={cart} />} />
      <Route
        path="/checkout"
        element={<CheckoutPage loadCart={loadCart} cart={cart} />}
      />
      <Route path="/orders" element={<OrdersPage cart={cart} />} />
      <Route
        path="/tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  );
}

export default App;
