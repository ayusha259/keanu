import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./NotFound.scss";
const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="notfound">
      <div>Not Found</div>
      <div
        style={{ display: "block", fontSize: "1.1rem" }}
        onClick={() =>
          location.state ? navigate(location.state as string) : navigate(-1)
        }
      >
        Retry
      </div>
    </div>
  );
};

export default NotFound;
