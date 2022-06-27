import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { IRootState } from "../../types";
import { motion } from "framer-motion";
import "./ProfilePage.scss";

const ProfilePage = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { isAuth } = useSelector((state: IRootState) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login", { state: location.pathname, replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);
  return (
    <div className="profile-container">
      <div className="profile">
        {showSidebar ? <div className="filterbar-backdrop"></div> : ""}
        <div
          className={`profile-sidebar ${
            showSidebar ? "profile-sidebar-show" : ""
          }`}
        >
          <i
            onClick={() => setShowSidebar(false)}
            className="fa-solid fa-xmark"
          ></i>
          <div className="profile-menu-head">Menu</div>
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `profile-side-o ${isActive ? "active" : ""}`
            }
            onClick={() => setShowSidebar(false)}
          >
            Profile
          </NavLink>
          <NavLink
            to="orders"
            className={({ isActive }) =>
              `profile-side-o ${isActive ? "active" : ""}`
            }
            onClick={() => setShowSidebar(false)}
          >
            Orders
          </NavLink>
        </div>
        <div className="profile-main">
          <div className="filter-hamburger">
            <i
              onClick={() => setShowSidebar(true)}
              className="fa-solid fa-bars"
            ></i>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
