import axios from "axios";
import { GET_ERRORS, GET_EMPLOYEES } from "./types";

export const loadEmployees = () => (dispatch) => {
  axios
    .get("http://localhost:8080/employees")
    .then((res) => {
      dispatch(getEmployees(res));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getEmployees = (employees) => {
  return {
    type: GET_EMPLOYEES,
    payload: employees,
  };
};
