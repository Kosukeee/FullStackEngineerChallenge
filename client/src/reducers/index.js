import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import feedbackReducer from "./feedbackReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  feedbacks: feedbackReducer,
});
