import axios from "axios";
import {
  GET_ERRORS,
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "./types";

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

export const setEmployee = (newEmployee) => {
  return {
    type: ADD_EMPLOYEE,
    payload: newEmployee,
  };
};

export const addEmployee = (employeeData) => (dispatch) => {
  axios
    .post("http://localhost:8080/api/admin/employee", employeeData)
    .then((res) => {
      dispatch(setEmployee(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setDeleteEmployee = (employeeId) => {
  return {
    type: DELETE_EMPLOYEE,
    payload: employeeId,
  };
};

export const deleteEmployee = (employeeId) => (dispatch) => {
  axios
    .delete(`http://localhost:8080/api/admin/employee/${employeeId}`)
    .then((res) => {
      dispatch(setDeleteEmployee(res.data._id));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setUpdateEmployee = (employeeData) => {
  return {
    type: UPDATE_EMPLOYEE,
    payload: employeeData,
  };
};

export const updateEmployee = (employeeId, updatedEmployeeData) => (
  dispatch
) => {
  axios
    .put(
      `http://localhost:8080/api/admin/employee/${employeeId}`,
      updatedEmployeeData
    )
    .then((res) => {
      dispatch(setUpdateEmployee(res.data));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
