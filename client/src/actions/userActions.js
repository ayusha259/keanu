import axios from "axios";

export const loginUser = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REQUEST" });
    const { data } = await axios.post("/api/users/login", {
      username: username,
      password: password,
    });
    const token = data["access"];

    dispatch(loginWithToken(token));
  } catch (error) {
    dispatch({
      type: "USER_ERROR",
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const loginWithToken = (token) => async (dispatch) => {
  try {
    const { data: user } = await axios.get("/api/users/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "USER_LOGIN",
      payload: {
        user: user,
        token: token,
      },
    });
    localStorage.setItem("token", JSON.stringify(token));
  } catch (error) {
    dispatch({
      type: "USER_LOGOUT",
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
