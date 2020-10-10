import {
  SET_CURRENT_USER,
  USER_LOADING,
  SET_ADMIN_USER,
  DELETE_ADMIN_USER,
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  currentUser: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        currentUser: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ADMIN_USER:
      return {
        ...state,
        isAdmin: true,
      };
    case DELETE_ADMIN_USER:
      return {
        ...state,
        isAdmin: false,
      };
    default:
      return state;
  }
}
