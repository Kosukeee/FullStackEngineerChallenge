import {
  SET_CURRENT_USER,
  USER_LOADING,
  ADD_EMPLOYEE,
  SET_EMPLOYEES,
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  employees: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.push(action.payload),
      };
    case SET_EMPLOYEES:
      console.log(action.payload.data.employees);
      return {
        ...state,
        employees: action.payload.data.employees,
      };
    default:
      return state;
  }
}
