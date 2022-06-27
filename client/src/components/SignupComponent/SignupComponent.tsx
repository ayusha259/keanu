import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputContainer from "../extras/InputContainer/InputContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IRootState } from "../../types";
import { Alert } from "@mui/material";
import { motion } from "framer-motion";
import "./SignupComponent.scss";
import axios from "axios";

const SignupComponent = () => {
  const [data, setData] = useState<{
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
  }>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState<string[] | null>(null);

  const { user } = useSelector((state: IRootState) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.password !== data.password2) {
      setError(["Passwords didn't match"]);
      return;
    }
    axios
      .post("/api/users/signup", data)
      .then((res) => {
        navigate("/login", { replace: true });
        dispatch({
          type: "OPEN_MODAL",
          payload: "User registerd",
        });
      })
      .catch((error) => {
        let e_list = [];
        let e =
          error.response && error.response
            ? error.response.data
            : error.message;
        for (let key in e) {
          e_list.push(key + "-" + e[key]);
        }
        setError(e_list);
      });
  };

  useEffect(() => {
    if (user) {
      if (location.state) {
        navigate(location.state as string, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
      className="login-box"
    >
      <div className="login-form-image">
        <img
          src="https://images.unsplash.com/photo-1656310580487-312cec6405d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
          alt=""
        />
      </div>
      <div className="login-form-container">
        <div className="login-form-header">
          <div>REGISTER</div>
          <div>
            Already have an account?
            <Link to="..">
              <span>Sign In</span>
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          {error ? error.map((e) => <Alert severity="error">{e}</Alert>) : ""}
          <div className="signup-2input">
            <div className="signup-input">
              <InputContainer
                required={true}
                label="First Name"
                type="text"
                value={data.first_name}
                onChange={handleChange}
                name="first_name"
              />
            </div>
            <div className="signup-input">
              <InputContainer
                required={true}
                label="Last Name"
                type="text"
                value={data.last_name}
                onChange={handleChange}
                name="last_name"
              />
            </div>
          </div>
          <div className="signup-input">
            <InputContainer
              required={true}
              label="Username"
              type="text"
              value={data.username}
              onChange={handleChange}
              name="username"
            />
          </div>
          <div className="signup-input">
            <InputContainer
              required={true}
              label="Email"
              type="email"
              value={data.email}
              onChange={handleChange}
              name="email"
            />
          </div>

          <div className="signup-input">
            <InputContainer
              required={true}
              label="Password"
              type="password"
              value={data.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          <div className="signup-input">
            <InputContainer
              required={true}
              label="Confirm Password"
              type="password"
              value={data.password2}
              onChange={handleChange}
              name="password2"
            />
          </div>
          <button className="form-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default SignupComponent;
