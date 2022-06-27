import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../types";
import InputContainer from "../extras/InputContainer/InputContainer";
import { IStepProps } from "./CheckoutPage";
import { motion } from "framer-motion";

const CheckoutStepContactInformation = ({
  increaseStep,
  decreaseStep,
}: IStepProps) => {
  const { user } = useSelector((state: IRootState) => state.user);

  const [firstname, setFirstname] = useState<string>(
    (user && user.first_name) || ""
  );
  const [lastname, setLastname] = useState<string>(
    (user && user.last_name) || ""
  );
  const [email, setEmail] = useState<string>((user && user.email) || "");

  const dispatch = useDispatch();

  const handleNext = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    dispatch({
      type: "CONTACT_INFORMATION",
      payload: {
        first_name: firstname,
        last_name: lastname,
        email,
      },
    });
    increaseStep();
  };

  return (
    <div className="checkoutstep-container">
      <div className="step">
        <div className="step-header">
          <span>1</span> Contact Information
        </div>
        <form onSubmit={handleNext} className="step1-form">
          <div className="step-input">
            <InputContainer
              required={true}
              label="First Name"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="step-input">
            <InputContainer
              required={true}
              label="Last Name"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="step-input">
            <InputContainer
              required={true}
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="checkoutsteps-btns">
            <div onClick={decreaseStep}>Back</div>
            <div onClick={handleNext}>Go to shipping</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutStepContactInformation;
