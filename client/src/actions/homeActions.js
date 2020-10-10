import axios from "axios";
// import { getFeedbacks } from "../../../controllers/feedback";
import { GET_EMPLOYEES, GET_FEEDBACKS } from "./types";

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

export const getFeedbacks = (feedbacks) => {
  return {
    type: GET_FEEDBACKS,
    payload: feedbacks,
  };
};

export const loadFeedbacks = () => (dispatch) => {
  axios
    .get("http://localhost:8080/api/feedbacks")
    .then((res) => {
      dispatch(getFeedbacks(res.data));
    })
    .catch((err) => {
      console.log(new Error(err));
    });
};
