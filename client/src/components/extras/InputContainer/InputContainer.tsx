import React, { useState } from "react";
import "./InputContainer.scss";

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
  label: string;
  required: boolean;
  name?: string;
}

const InputContainer = ({
  onChange,
  value,
  type,
  label,
  required,
  name,
}: IProps) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    if (value.length > 0) return;
    setFocus(false);
  };
  return (
    <div className="inputcontainer">
      <div
        className={`inputcontainer-${
          focus || value.length > 0 ? "focus" : "label"
        }`}
      >
        {label}
      </div>
      <input
        required={required}
        onBlur={handleBlur}
        onFocus={handleFocus}
        type={type}
        onChange={(e) => onChange(e)}
        value={value}
        name={name ? name : ""}
      />
    </div>
  );
};

export default InputContainer;
