export interface IUserState {
  user: any;
  token: string | null;
  isAuth: boolean;
  error: string | null | string[];
  loading: boolean;
}

const initialState: IUserState = {
  user: null,
  token: null,
  isAuth: false,
  error: null,
  loading: false,
};

const userReducer = (
  state = initialState,
  action: { type: string; payload: any }
): IUserState => {
  switch (action.type) {
    case "USER_REQUEST": {
      return { ...state, loading: true };
    }
    case "USER_LOGIN": {
      return {
        ...state,
        user: action.payload.user,
        isAuth: true,
        token: action.payload.token,
        error: null,
        loading: false,
      };
    }
    case "USER_ERROR": {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    case "USER_LOGOUT": {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      return {
        ...initialState,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
