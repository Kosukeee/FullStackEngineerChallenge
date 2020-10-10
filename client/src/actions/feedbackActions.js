import axios from "axios";
import { GET_FEEDBACKS, ADD_FEEDBACK } from "./types";

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

const addFeedback = (newFeedback) => {
  return {
    type: ADD_FEEDBACK,
    payload: newFeedback,
  };
};

export const postFeedback = (newFeedback) => (dispatch) => {
  axios
    .post("/api/feedback", newFeedback)
    .then((res) => {
      dispatch(addFeedback(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
