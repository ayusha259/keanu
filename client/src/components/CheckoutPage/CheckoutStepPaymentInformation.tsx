import { Radio } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IStepProps } from "./CheckoutPage";

const CheckoutStepPaymentInformation = ({
  increaseStep,
  decreaseStep,
  handleCheckout,
}: IStepProps) => {
  const [value, setValue] = useState<string>("");
  const dispatch = useDispatch();

  const handleNext = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    dispatch({
      type: "PAYMENT_INFORMATION",
      payload: value,
    });
    if (handleCheckout) {
      handleCheckout();
    }
  };
  return (
    <div className="checkoutstep-container">
      <div className="step">
        <div className="step-header">
          <span>3</span> Payment Information
        </div>
        <form onSubmit={handleNext} className="step3-form">
          <div className="radio-container">
            <Radio
              checked={value === "paypal"}
              value="paypal"
              name="paypal"
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="radio-label">
              <i
                style={{ marginRight: "5px" }}
                className="fa-brands fa-paypal"
              ></i>
              Paypal
            </div>
          </div>
          <div className="checkoutsteps-btns">
            <div onClick={decreaseStep}>Back</div>
            <div onClick={handleNext}>Place Order</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutStepPaymentInformation;
