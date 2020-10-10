import {
  ADD_EMPLOYEE,
  GET_EMPLOYEES,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "../actions/types";

const initialState = {
  employees: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
