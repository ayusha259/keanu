import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LoginComponent.scss";
import { loginUser } from "../../actions/userActions";
import { AnyAction } from "redux";
import InputContainer from "../extras/InputContainer/InputContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IRootState } from "../../types";
import { Alert } from "@mui/material";
import { motion } from "framer-motion";

const LoginComponent = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, error } = useSelector((state: IRootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(username, password) as unknown as AnyAction);
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
          src="https://images.unsplash.com/photo-1622608839539-c0ba88a3a09e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
          alt=""
        />
      </div>
      <div className="login-form-container">
        <div className="login-form-header">
          <div>SIGN IN</div>
          <div>
            Don't have an account?
            <Link to="register">
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {error ? <Alert severity="error">{error}</Alert> : ""}
          <div className="login-input">
            <InputContainer
              required={true}
              label="Username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="login-input">
            <InputContainer
              required={true}
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
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

export default LoginComponent;
