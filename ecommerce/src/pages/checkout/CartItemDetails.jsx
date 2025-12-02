import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useEffect, useRef, useState } from "react";

export function CartItemDetail({ cartItem, loadCart }) {
  const inputRef = useRef(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  useEffect(() => {
    if (isUpdating && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isUpdating]);

  useEffect(() => {
    // Close when clicking outside
    function handleClickOutside(e) {
      if (
        isUpdating &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setIsUpdating(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUpdating]);

  const onUpdateHandler = async () => {
    if (isUpdating) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      loadCart();
    }
    setIsUpdating(!isUpdating);
  };

  const onKeyDownHandler = async (e) => {
    inputRef.current.focus();

    if (e.key === "Enter") {
      if (isUpdating) {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
          quantity: Number(quantity),
        });
        loadCart();
        setIsUpdating(!isUpdating);
      }
    }
    if (e.key === "Escape") {
      setIsUpdating(!isUpdating);
    }
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isUpdating ? (
              <input
                type="text"
                ref={inputRef}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                onKeyDown={(e) => onKeyDownHandler(e)}
                style={{ width: "50px" }}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            onClick={onUpdateHandler}
            className="update-quantity-link link-primary"
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
