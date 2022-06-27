export const initialState = {
  cartItems: [],
  contactInformation: {
    first_name: "",
    last_name: "",
    email: "",
  },
  shippingInformation: {
    phone: "",
    apt_no: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalcode: "",
  },
  paymentInformation: {
    type: "",
  },
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      let item = action.payload;
      const existItem = state.cartItems.find((i) => i._id === item._id);
      let newState;
      if (existItem) {
        newState = {
          ...state,
          cartItems: state.cartItems.map((i) => {
            if (i._id !== item._id) return i;
            return { ...i, qty: i.qty + item.qty };
          }),
        };
      } else {
        newState = { ...state, cartItems: [...state.cartItems, item] };
      }
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }
    case "CART_REMOVE_ITEM": {
      let id = action.payload;
      let newState;
      newState = {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== id),
      };
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }

    case "CONTACT_INFORMATION": {
      // localStorage.setItem(
      //   "contact_information",
      //   JSON.stringify(action.payload)
      // );
      return {
        ...state,
        contactInformation: action.payload,
      };
    }
    case "SHIPPING_INFORMATION": {
      // localStorage.setItem(
      //   "shipping_information",
      //   JSON.stringify(action.payload)
      // );
      return {
        ...state,
        shippingInformation: action.payload,
      };
    }
    case "PAYMENT_INFORMATION": {
      // localStorage.setItem(
      //   "payment_information",
      //   JSON.stringify(action.payload)
      // );
      return {
        ...state,
        paymentInformation: {
          ...state.paymentInformation,
          type: action.payload,
        },
      };
    }

    case "CLEAR_INFORMATION": {
      return {
        ...state,
        contactInformation: initialState.contactInformation,
        shippingInformation: initialState.shippingInformation,
        paymentType: initialState.paymentInformation,
      };
    }

    case "CLEAR_CART_INFORMATION": {
      localStorage.removeItem("cart");
      return initialState;
    }
    default:
      return state;
  }
};

export default cartReducer;
