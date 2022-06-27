import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../types";
import InputContainer from "../extras/InputContainer/InputContainer";
import { IStepProps } from "./CheckoutPage";

const CheckoutStepShippingInformation = ({
  increaseStep,
  decreaseStep,
}: IStepProps) => {
  const { shippingInformation } = useSelector(
    (state: IRootState) => state.cart
  );

  const [apt_no, setApt_no] = useState(shippingInformation.apt_no || "");
  const [phone, setPhone] = useState(shippingInformation.phone || "");
  const [address, setAddress] = useState(shippingInformation.address || "");
  const [city, setCity] = useState(shippingInformation.city || "");
  const [state, setState] = useState(shippingInformation.state || "");
  const [postalcode, setPostalcode] = useState(
    shippingInformation.postalcode || ""
  );
  const [country, setCountry] = useState<string>(
    shippingInformation.country || ""
  );

  const dispatch = useDispatch();

  const handleNext = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    dispatch({
      type: "SHIPPING_INFORMATION",
      payload: {
        apt_no,
        phone,
        address,
        city,
        state,
        postalcode,
        country,
      },
    });
    increaseStep();
  };

  return (
    <div className="checkoutstep-container">
      <div className="step">
        <div className="step-header">
          <span>2</span> Shipping Information
        </div>
        <form onSubmit={handleNext} className="step2-form">
          <div className="step-input">
            <InputContainer
              required={true}
              label="Phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="step-input">
            <InputContainer
              required={true}
              label="Apt/House No."
              type="text"
              value={apt_no}
              onChange={(e) => setApt_no(e.target.value)}
            />
          </div>
          <div className="step-input">
            <InputContainer
              required={true}
              label="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="step-2input">
            <div className="step-input">
              <InputContainer
                required={true}
                label="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="step-input">
              <InputContainer
                required={true}
                label="State"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
          </div>
          <div className="step-2input">
            <div className="step-input">
              <InputContainer
                required={true}
                label="Country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="step-input">
              <InputContainer
                required={true}
                label="Pin Code"
                type="text"
                value={postalcode}
                onChange={(e) => setPostalcode(e.target.value)}
              />
            </div>
          </div>

          <div className="checkoutsteps-btns">
            <div onClick={decreaseStep}>Back</div>
            <div onClick={handleNext}>Go to Payment</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutStepShippingInformation;
