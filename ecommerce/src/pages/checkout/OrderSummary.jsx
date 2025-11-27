import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetail } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";

export function OrderSummary({ deliveryOptions, cart }) {
  return (
    <>
      <div className="order-summary">
        {deliveryOptions.length > 0 &&
          cart.map((cartItem) => {
            const selectedDeliveryOption = deliveryOptions.find(
              (deliveryOption) =>
                deliveryOption.id === cartItem.deliveryOptionId
            );
            return (
              <div key={cartItem.id} className="cart-item-container">
                <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

                <div className="cart-item-details-grid">
                  <CartItemDetail cartItem={cartItem} />
                  <DeliveryOptions
                    cartItem={cartItem}
                    deliveryOptions={deliveryOptions}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
