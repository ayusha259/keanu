import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../types";
import { motion } from "framer-motion";

const convertNumberToString = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CheckoutCartSummary = ({
  subtotal,
  tax,
  shipping,
  total,
}: {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}) => {
  const { cartItems } = useSelector((state: IRootState) => state.cart);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="checkout-summary-container"
    >
      <div className="checkout-summary">
        <div className="summary-head">
          {cartItems.length} <span>item</span>
        </div>
        <div className="summary-content">
          <div className="summary-items">
            {cartItems.length > 0
              ? cartItems.map((i) => (
                  <div key={i._id} className="summary-item">
                    <div className="item-image">
                      <img src={i.image} alt="" />
                    </div>
                    <div className="item-info">
                      <div>
                        ₹{convertNumberToString(i.price)} <span>x{i.qty}</span>
                      </div>
                      <div>
                        <span style={{ display: "block" }}>{i.brand}</span>
                        <span style={{ display: "block" }}>{i.title}</span>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>
          <div className="summary-pricing">
            <div className="summary-price">
              <div>Subtotal:</div>
              <div>₹{subtotal}</div>
            </div>
            <div className="summary-price">
              <div>Shipping:</div>
              <div>₹{shipping}</div>
            </div>
            <div className="summary-price">
              <div>Taxes:</div>
              <div>₹{tax}</div>
            </div>
            <div className="summary-price">
              <div>Total to pay:</div>
              <div>₹{total}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutCartSummary;
