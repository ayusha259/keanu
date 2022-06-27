import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ICart, IRootState } from "../../../types";
import { motion } from "framer-motion";
import "./Cart.scss";

const convertNumberToString = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const calculateTotal = (items: ICart["cartItems"]): string => {
  if (items.length === 0) return "0";
  let total = 0;
  items.forEach((i) => {
    total += i.price * i.qty;
  });
  return convertNumberToString(total);
};

const Cart = ({ close }: { close: () => void }) => {
  const { cartItems } = useSelector((state: IRootState) => state.cart);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      close();
    } else return;
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  });

  const handlepagechange = () => {
    close();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring" }}
      exit={{ opacity: 0, y: -20 }}
      onClick={(e) => handleClose(e)}
      className="cart-container"
    >
      <div className="cart-main">
        <div className="cart-header">
          YOUR CART{" "}
          <span style={{ fontSize: "0.9rem" }}>{cartItems.length}</span>
        </div>
        <div className="cart-items-list">
          {cartItems.length > 0 ? (
            cartItems.map((i) => (
              <div key={i._id} className="cart-item">
                <div className="cart-item-img">
                  <img src={i.image} alt="" />
                </div>
                <div className="cart-item-title">{i.title}</div>
                <div className="cart-item-price">
                  ₹{convertNumberToString(i.price)} <span>x{i.qty}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-cart">Your Cart is Empty</div>
          )}
        </div>
        <div className="cart-actions">
          <div className="cart-total">
            <span>Total:</span>
            <span>₹{calculateTotal(cartItems)}</span>
          </div>
          <div className="cart-btns">
            <motion.div
              whileTap={{
                scale: 0.9,
              }}
              transition={{ duration: 0.3, type: "spring" }}
              style={{ userSelect: "none" }}
              className="cart-btn"
              onClick={close}
            >
              Continue Shopping
            </motion.div>
            <Link onClick={handlepagechange} to="/cart">
              <motion.div
                whileTap={{
                  scale: 0.9,
                }}
                transition={{ duration: 0.3, type: "spring" }}
                style={{ userSelect: "none" }}
                className="cart-btn"
              >
                Check Out
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
