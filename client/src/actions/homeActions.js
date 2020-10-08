import axios from "axios";
import { GET_ERRORS, SET_EMPLOYEES } from "./types";

export const getEmployees = () => (dispatch) => {
  axios
    .get("http://localhost:8080/employees")
    .then((res) => {
      dispatch(setEmployees(res));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setEmployees = (employees) => {
  return {
    type: SET_EMPLOYEES,
    payload: employees,
  };
};
