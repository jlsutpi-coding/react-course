import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";

function CheckoutPage({ cart }) {
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    const fetchCheckoutPageData = async () => {
      const responseDeliveryOptions = await axios.get(
        "/api/delivery-options?expand=estimatedDeliveryTime"
      );
      setDeliveryOptions(responseDeliveryOptions.data);
      const responsePaySummary = await axios.get("/api/payment-summary");
      setPaymentSummary(responsePaySummary.data);
    };
    fetchCheckoutPageData();
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="favicon/cart-favicon.png" />
      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
