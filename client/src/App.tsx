import React from "react";
import "./App.css";
import Navbar from "./components/extras/Navbar/Navbar";
import HomePage from "./components/HomePage/HomePage";
import FilterContextProvider from "./components/context/FilterContextProvider";
import { Route, Routes, useLocation } from "react-router-dom";
import ProductPage from "./components/ProductPage/ProductPage";
import CartPage from "./components/Cart/CartPage";
import Snackbar from "@mui/material/Snackbar";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "./types";
import { SnackbarContent } from "@mui/material";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import NotFound from "./components/NotFound";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ProfileComponent from "./components/ProfilePage/Components/ProfileComponent";
import OrderComponent from "./components/ProfilePage/Components/OrderComponent";
import OrderDetailComponent from "./components/ProfilePage/Components/OrderDetailComponent";
import { AnimatePresence } from "framer-motion";
import SignupComponent from "./components/SignupComponent/SignupComponent";
import AuthContainer from "./components/AuthContainer/AuthContainer";

// const ProtectedRoute = ({ children, isAuth, redirectPath }: any) => {
//   if (!isAuth) {
//     return <Navigate to={redirectPath} replace />;
//   }
//   return children;
// };

function App() {
  const { open, message } = useSelector((state: IRootState) => state.snackBar);
  const dispatch = useDispatch();
  const location = useLocation();
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: "CLOSE_MODAL" });
  };
  return (
    <div className="App">
      <FilterContextProvider>
        <Navbar />
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route exact path="" element={<HomePage />} />
            <Route exact path="user" element={<ProfilePage />}>
              <Route index element={<ProfileComponent />} />
              <Route path="orders" element={<OrderComponent />} />
              <Route path="orders/:id" element={<OrderDetailComponent />} />
            </Route>
            <Route exact path="product/:slug" element={<ProductPage />} />
            <Route exact path="cart" element={<CartPage />} />
            <Route exact path="checkout" element={<CheckoutPage />} />
            <Route exact path="login" element={<AuthContainer />}>
              <Route index element={<LoginComponent />} />
              <Route path="register" element={<SignupComponent />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </FilterContextProvider>
      <Snackbar onClose={handleClose} open={open} autoHideDuration={2000}>
        <SnackbarContent
          style={{
            backgroundColor: "#603faa",
          }}
          message={<span id="client-snackbar">{message}</span>}
        />
      </Snackbar>
    </div>
  );
}

export default App;
