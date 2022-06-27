import { IOptionsState } from "./reducers/optionsReducer";
import { IUserState } from "./reducers/userReducer";

export interface IProduct {
  _id: number;
  title: string;
  price: number;
  brand: string;
  isOffer: boolean;
  discount: number;
  description: string;
  category: string;
  countInStock: number;
  rating: number;
  images: {
    image: {
      url: string;
      publid_id: string;
    };
    id: number;
  }[];
  slug: string;
  avg_rating?: number;
  num_reviews?: number;
}

export interface IReview {
  _id: number;
  user: string;
  title: string;
  rating: number;
  review: string;
  created_at: string;
}

export interface ICart {
  cartItems: {
    _id: number;
    title: string;
    image: string;
    qty: number;
    price: number;
    brand: string;
    slug: string;
  }[];
  contactInformation: {
    first_name: string;
    last_name: string;
    email: string;
  };
  shippingInformation: {
    phone: string;
    apt_no: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
  };
  paymentInformation: {
    type: string;
  };
}

interface ISnackbar {
  open: boolean;
  message: string;
}

export interface IRootState {
  cart: ICart;
  options: IOptionsState;
  user: IUserState;
  snackBar: ISnackbar;
}
