import axios from "axios";
import { GET_EMPLOYEES } from "./types";

export const loadEmployees = () => (dispatch) => {
  axios
    .get("http://localhost:8080/api/employees")
    .then((res) => {
      dispatch(getEmployees(res));
    })
    .catch((err) => {
      console.error(new Error(err));
    });
};

export const getEmployees = (employees) => {
  return {
    type: GET_EMPLOYEES,
    payload: employees,
  };
};
