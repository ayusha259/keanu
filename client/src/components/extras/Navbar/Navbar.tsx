import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import Badge from "@mui/material/Badge";
import "./Navbar.scss";
import { IRootState } from "../../../types";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [showCart, setShowCart] = useState<boolean>(false);
  const { cartItems } = useSelector((state: IRootState) => state.cart);
  const { isAuth, user } = useSelector((state: IRootState) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT", payload: "" });
    dispatch({
      type: "OPEN_MODAL",
      payload: "Logged Out",
    });
  };
  return (
    <>
      <nav className="navbar-container">
        <div className="navbar">
          <div className="left">
            <div className="head">
              <Link to="/">KEANU</Link>
            </div>
            <ul className="left-links">
              <li>Delivery and payment</li>
              <li>Warranty and return</li>
              <li>Gift Cards</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="right">
            {isAuth && user ? (
              <div className="navbar-auth-container">
                <div onClick={handleLogout} className="navbar-logout-btn">
                  <i className="fa-solid fa-power-off"></i>
                </div>
                <div className="user-info">
                  <div className="user-greet">
                    Hello,{" "}
                    <span id="name">
                      <Link to="/user">{user.username}</Link>
                    </span>
                  </div>
                  <div className="user-icon">
                    <Link to="/user">
                      <i className="fa-solid fa-user"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sign-in-btn">
                <Link to="login">Sign In</Link>
              </div>
            )}

            <Badge
              badgeContent={cartItems ? cartItems.length : 0}
              color="primary"
            >
              <div onClick={() => setShowCart(!showCart)} className="cart">
                <i className="fas fa-shopping-cart"></i>
              </div>
            </Badge>

            <div className="hamburger">
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {showCart ? <Cart close={() => setShowCart(false)} /> : ""}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
