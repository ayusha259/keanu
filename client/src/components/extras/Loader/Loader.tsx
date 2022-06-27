import React from "react";
import "./Loader.scss";

const S = {
  small: {
    height: "25px",
    width: "25px",
  },
  medium: {
    height: "40px",
    width: "40px",
  },
  large: {
    height: "50px",
    width: "50px",
  },
};

const Loader = ({ size }: { size: "small" | "medium" | "large" }) => {
  return (
    <div className="loader">
      <div className="container">
        <div style={S[size]} className="circle"></div>
        <div style={S[size]} className="circle"></div>
      </div>
    </div>
  );
};

export default Loader;
