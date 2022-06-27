import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../../types";
import { motion } from "framer-motion";

import Loader from "../../extras/Loader/Loader";

const ProfileComponent = () => {
  const { user } = useSelector((state: IRootState) => state.user);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ y: 20, opacity: 0 }}
      className="profile-about"
    >
      {user ? (
        <div className="about-user-info">
          <div className="about-name">
            {user.first_name} {user.last_name}
          </div>
          <div className="about-extra">{user.email}</div>
          <div className="about-extra">(91+) 7000031083</div>
        </div>
      ) : (
        <Loader size="small" />
      )}
    </motion.div>
  );
};

export default ProfileComponent;
