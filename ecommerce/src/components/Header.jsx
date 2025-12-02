import { NavLink, useNavigate } from "react-router";
import "./Header.css";
import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhite from "../assets/images/mobile-logo-white.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import CartIcon from "../assets/images/icons/cart-icon.png";
import { useRef } from "react";

function Header({ cart }) {
  const navigate = useNavigate();
  const inputRef = useRef();

  let cartQuantity = 0;
  cart.forEach((cartItem) => (cartQuantity += cartItem.quantity));

  const handleSearchButton = () => {
    navigate(`/?search=${inputRef.current.value}`);
  };
  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src={LogoWhite} />
            <img className="mobile-logo" src={MobileLogoWhite} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            ref={inputRef}
            className="search-bar"
            type="text"
            placeholder="Search"
          />

          <button className="search-button" onClick={handleSearchButton}>
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{cartQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
export default Header;
