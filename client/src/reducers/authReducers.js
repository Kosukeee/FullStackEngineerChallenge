import {
  SET_CURRENT_USER,
  USER_LOADING,
  ADD_EMPLOYEE,
  GET_EMPLOYEES,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  SET_ADMIN_USER,
  DELETE_ADMIN_USER,
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  currentUser: {},
  loading: false,
  employees: [],
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
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload.data.employees,
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee._id !== action.payload
        ),
      };
    case UPDATE_EMPLOYEE:
      const index = state.employees.findIndex(
        (employee) => employee._id === action.payload._id
      );
      const newArray = [...state.employees];
      newArray[index] = action.payload;

      return {
        ...state,
        employees: newArray,
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
