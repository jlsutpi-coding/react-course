import Header from "../../components/Header";
import "./OrdersPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { OrdersGrid } from "./OrdersGrid";
import { OrdersHeader } from "./OrdersHeader";

function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="favicon/orders-favicon.png" />

      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-container">
              <OrdersHeader order={order} />
              <OrdersGrid order={order} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default OrdersPage;
