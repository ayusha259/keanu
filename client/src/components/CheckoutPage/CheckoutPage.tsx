import axios from "../../lib/axios";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ICart, IRootState } from "../../types";
import CheckoutCartSummary from "./CheckoutCartSummary";
import "./CheckoutPage.scss";
import CheckoutStepContactInformation from "./CheckoutStepContactInformation";
import CheckoutStepPaymentInformation from "./CheckoutStepPaymentInformation";
import CheckoutStepShippingInformation from "./CheckoutStepShippingInformation";
import { motion } from "framer-motion";

export interface IStepProps {
  increaseStep: () => void;
  decreaseStep: () => void;
  handleCheckout?: () => void;
}

const CheckoutPage = () => {
  const { isAuth, token } = useSelector((state: IRootState) => state.user);
  const { cartItems } = useSelector((state: IRootState) => state.cart);
  const { contactInformation, paymentInformation, shippingInformation } =
    useSelector((state: IRootState) => state.cart);

  const calculateTotal = (items: ICart["cartItems"]): number => {
    if (items.length === 0) return 0;
    let total = 0;
    items.forEach((i) => {
      total += i.price * i.qty;
    });
    return total;
  };

  const subtotal = calculateTotal(cartItems);
  const tax = (subtotal * 18) / 100;
  const shipping = subtotal > 1000 ? 0 : 200;
  const total = subtotal + tax + shipping;

  const [step, setStep] = useState<number>(1);
  const dispatch = useDispatch();

  const increaseStep = () => {
    if (step === 3) return;
    setStep(step + 1);
  };
  const decreaseStep = () => {
    if (step === 1) return;
    setStep(step - 1);
  };

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login", { state: location.pathname, replace: true });
    } else if (cartItems.length === 0) {
      navigate("/", { replace: true });
    }
  });

  const handleCheckout = async () => {
    try {
      await axios.post(
        "/api/orders/place",
        {
          order: {
            taxPrice: tax,
            shippingPrice: shipping,
            totalPrice: total,
            paymentMethod: paymentInformation.type,
          },
          shipping: {
            ...shippingInformation,
            first_name: contactInformation.first_name,
            last_name: contactInformation.last_name,
          },
          items: cartItems.map((i) => {
            return { _id: i._id, qty: i.qty, price: i.price };
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "CLEAR_CART_INFORMATION" });
      dispatch({ type: "OPEN_MODAL", payload: "Order placed" });
    } catch (error) {
      navigate("/notfound");
    }
    navigate("/", { replace: true });
  };

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [step]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      className="checkout-container"
    >
      <div className="checkout">
        <div className="checkout-left">
          <div className="head">
            Checkout
            <br />
            <span>Details</span>
          </div>
          <div className="checkout-details-steps">
            <AnimatePresence exitBeforeEnter>
              {step === 1 ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  key={1}
                  ref={divRef}
                  className="checkoutsteps"
                >
                  <CheckoutStepContactInformation
                    increaseStep={increaseStep}
                    decreaseStep={decreaseStep}
                  />
                </motion.div>
              ) : (
                ""
              )}
              {step === 2 ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  key={2}
                  ref={divRef}
                  className="checkoutsteps"
                >
                  <CheckoutStepShippingInformation
                    increaseStep={increaseStep}
                    decreaseStep={decreaseStep}
                  />
                </motion.div>
              ) : (
                ""
              )}
              {step === 3 ? (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  key={3}
                  ref={divRef}
                  className="checkoutsteps"
                >
                  <CheckoutStepPaymentInformation
                    increaseStep={increaseStep}
                    decreaseStep={decreaseStep}
                    handleCheckout={handleCheckout}
                  />
                </motion.div>
              ) : (
                ""
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="checkout-right">
          {step > 1 && (
            <div className="checkout-lookup-container">
              <div className="checkout-lookup">
                {step > 1 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ transformOrigin: "top center" }}
                    className="lookup-item"
                  >
                    <div className="lookup-item-step">
                      <span>1</span>
                    </div>
                    <div className="lookup-item-info">
                      <div className="lookup-item-infoheader">
                        <div>Contact Information</div>
                        <div>Edit</div>
                      </div>
                      <div className="lookup-item-content">
                        {`${contactInformation.first_name} ${contactInformation.last_name} (${contactInformation.email})`}
                      </div>
                    </div>
                  </motion.div>
                )}
                {step > 2 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ transformOrigin: "top center" }}
                    className="lookup-item"
                  >
                    <div className="lookup-item-step">
                      <span>2</span>
                    </div>
                    <div className="lookup-item-info">
                      <div className="lookup-item-infoheader">
                        <div>Shipping Information</div>
                        <div>Edit</div>
                      </div>
                      <div className="lookup-item-content">
                        {`${shippingInformation.apt_no}, ${shippingInformation.address}, ${shippingInformation.city}, ${shippingInformation.state}, ${shippingInformation.country}`}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
          <CheckoutCartSummary
            total={total}
            subtotal={subtotal}
            tax={tax}
            shipping={shipping}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
