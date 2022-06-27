import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { loginWithToken } from "./actions/userActions";
import cartReducer from "./reducers/cartReducer";
import optionsReducer from "./reducers/optionsReducer";
import userReducer from "./reducers/userReducer";
import { initialState as cartInitialState } from "./reducers/cartReducer";

const snackbarReducer = (state = { open: false, message: "" }, action) => {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        open: true,
        message: action.payload,
      };
    }

    case "CLOSE_MODAL": {
      return {
        open: false,
        message: "",
      };
    }
    default:
      return state;
  }
};

const reducers = combineReducers({
  cart: cartReducer,
  options: optionsReducer,
  user: userReducer,
  snackBar: snackbarReducer,
});

const cartFromLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const initialState = {
  cart: { ...cartInitialState, cartItems: cartFromLocalStorage.cartItems },
};

const middlewares = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;
if (token) {
  store.dispatch({ type: "USER_REQUEST" });
  store.dispatch(loginWithToken(token));
}

export default store;
