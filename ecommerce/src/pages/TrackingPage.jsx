import { Link, useParams } from "react-router";
import Header from "../components/Header";
import "./TrackingPage.css";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";

function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrder(response.data);
    };
    fetchData();
  }, [orderId]);
  if (!order) {
    return null;
  }
  const productDetail = order.products.find(
    (product) => product.productId === productId
  );

  const totalDeliveryTimesMs =
    productDetail.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimesMs) * 100;
  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }
  return (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        href="favicon/tracking-favicon.png"
      />
      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="tracking-products">
            <div className="delivery-date mt-2">
              {deliveryPercent >= 100 ? "Delivered on" : "Ariving on"}
              {dayjs(productDetail.product.estimatedDeliveryTimeMs).format(
                " dddd, MMMM DD"
              )}
            </div>

            <div className="product-info">{productDetail.product.name}</div>

            <div className="product-info">
              Quantity: {productDetail.quantity}
            </div>

            <img className="product-image" src={productDetail.product.image} />
            <div className="progress-labels-container">
              <div className="progress-label">
                {deliveryPercent < 33 ? "isPreparing" : ""}
              </div>
              <div className="progress-label current-status">
                {deliveryPercent >= 33 && deliveryPercent < 100
                  ? "isShipping"
                  : ""}
              </div>
              <div className="progress-label">
                {deliveryPercent === 100 ? "isDeilvered" : ""}
              </div>
            </div>

            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${deliveryPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;
