import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  SET_ADMIN_USER,
  DELETE_ADMIN_USER,
} from "./types";

export const signupUser = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:8080/signup", userData)
    .then((res) => history.push("/login"))
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/login", userData)
    .then((res) => {
      const isAdmin = userData.email === "admin@test.com";
      const { token } = res.data;
      const decoded = jwt_decode(token);

      localStorage.setItem("jwtToken", token);
      if (isAdmin) {
        localStorage.setItem("isAdmin", true);
        dispatch(setAdminUser());
      }
      setAuthToken(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setAdminUser = () => {
  return {
    type: SET_ADMIN_USER,
  };
};

export const deleteAdminUser = () => {
  return {
    type: DELETE_ADMIN_USER,
  };
};

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(deleteAdminUser());
  dispatch(setCurrentUser({}));
  history.push("/login");
};
