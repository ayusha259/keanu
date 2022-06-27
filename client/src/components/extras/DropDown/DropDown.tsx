import React, { useState } from "react";
import "./DropDown.scss";

interface IProps {
  className: string;
  heading: string;
  default: boolean;
  children: React.ReactNode;
}

const DropDown = (props: IProps) => {
  const [showDrop, setShowDrop] = useState(props.default);
  return (
    <div className={props.className}>
      <div onClick={() => setShowDrop(!showDrop)} className="dropdown-head">
        {props.heading}{" "}
        <i className={`fas fa-angle-${showDrop ? "down" : "right"}`}></i>
      </div>
      {showDrop ? <div className="drop">{props.children}</div> : ""}
    </div>
  );
};

export default DropDown;
