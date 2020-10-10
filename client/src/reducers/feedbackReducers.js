import { ADD_FEEDBACK, GET_FEEDBACKS } from "../actions/types";

const initialState = {
  feedbacks: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FEEDBACKS:
      return {
        ...state,
        feedbacks: action.payload,
      };
    case ADD_FEEDBACK:
      return {
        ...state,
        feedbacks: [...state.feedbacks, action.payload],
      };
    default:
      return state;
  }
}
