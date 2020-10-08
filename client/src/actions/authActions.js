import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
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
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
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

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const setEmployee = (employeeData) => {
  return {
    type: ADD_EMPLOYEE,
    payload: employeeData,
  };
};

export const addEmployee = (employeeData) => (dispatch) => {
  axios
    .post("http://localhost:8080/employee", employeeData)
    .then((res) => {
      console.log(res);
      dispatch(setEmployee(employeeData));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setDeleteEmployee = (employeeId) => {
  return {
    type: DELETE_EMPLOYEE,
    payload: employeeId,
  };
};

export const deleteEmployee = (employeeId) => (dispatch) => {
  axios
    .delete(`http://localhost:8080/employee/${employeeId}`)
    .then((res) => {
      console.log("Deleted");
      dispatch(setDeleteEmployee(employeeId));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setUpdateEmployee = (employeeId, employeeData) => {
  return {
    type: UPDATE_EMPLOYEE,
    payload: {
      id: employeeId,
      data: employeeData,
    },
  };
};

export const updateEmployee = (employeeId, employeeData) => (dispatch) => {
  console.log(employeeId);
  console.log(employeeData);
  axios
    .put(`http://localhost:8080/employee/${employeeId}`, employeeData)
    .then((res) => {
      console.log(`axios returned ${res}`);
      dispatch(setUpdateEmployee(employeeId, employeeData));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
