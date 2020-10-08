import {
  SET_CURRENT_USER,
  USER_LOADING,
  ADD_EMPLOYEE,
  SET_EMPLOYEES,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
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
      return {
        ...state,
        employees: action.payload.data.employees,
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
      };
    case UPDATE_EMPLOYEE:
      console.log("UPDATE_EMPLOYEE is called");
      console.log(action.payload);
      return {
        ...state,
        employees: action.payload,
      };
    default:
      return state;
  }
}
