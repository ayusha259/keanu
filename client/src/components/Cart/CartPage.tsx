import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ICart, IRootState } from "../../types";
import ImageContainer from "../extras/ImageContainer/ImageContainer";
import { motion } from "framer-motion";
import "./CartPage.scss";
const convertNumberToString = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CartPage = () => {
  const { cartItems } = useSelector((state: IRootState) => state.cart);
  const dispatch = useDispatch();
  const handleRemoveItem = (id: number) => {
    dispatch({
      type: "CART_REMOVE_ITEM",
      payload: id,
    });
    dispatch({
      type: "OPEN_MODAL",
      payload: "Item removed from cart",
    });
  };
  const calculateTotal = (items: ICart["cartItems"]): string => {
    if (items.length === 0) return "0";
    let total = 0;
    items.forEach((i) => {
      total += i.price * i.qty;
    });
    return convertNumberToString(total);
  };

  return (
    <div className="cartpage">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ y: 20, opacity: 0 }}
        className="cartpage-cart"
      >
        <div className="cartpage-header">
          <div>
            My <span>Cart ({cartItems.length})</span>
          </div>
        </div>
        <div className="cartpage-contents-container">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="cartpage-contents-item" key={item._id}>
                <div className="cartpage-item-info">
                  <div className="cartpage-image">
                    <ImageContainer image={item.image} />
                  </div>
                  <div className="cartpage-title">
                    <div>{item.brand}</div>
                    <Link to={`../product/${item.slug}`}>{item.title}</Link>
                  </div>
                </div>
                <div className="cartpage-item-right">
                  <div className="cartpage-price">
                    ₹{convertNumberToString(item.price)}
                  </div>
                  <div className="cartpage-qty">
                    <i className="fa-solid fa-chevron-left"></i>
                    <span>{item.qty}</span>
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                  <div className="cartpage-itemtotal">
                    ₹{convertNumberToString(item.price * item.qty)}
                  </div>
                  <div
                    onClick={() => handleRemoveItem(item._id)}
                    className="cartpage-deleteitem"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="cartpage-empty">
              Your Cart is Empty.{" "}
              <Link style={{ color: "blue" }} to="/">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
        {cartItems.length > 0 ? (
          <div className="cartpage-total-container">
            <div className="cartpage-total">
              <div className="cartpage-total-header">
                <div>SUBTOTAL</div>
                <div>₹{calculateTotal(cartItems)}</div>
              </div>
              <div className="cartpage-total-message">
                *Shipping and Taxes Calculated at checkout
              </div>
              <Link to="/checkout">
                <motion.div
                  whileTap={{
                    scale: 0.9,
                  }}
                  transition={{ duration: 0, type: "spring" }}
                  style={{ userSelect: "none" }}
                  className="cartpage-checkout-btn"
                >
                  Checkout
                </motion.div>
              </Link>
            </div>
          </div>
        ) : (
          ""
        )}
      </motion.div>
    </div>
  );
};

export default CartPage;
