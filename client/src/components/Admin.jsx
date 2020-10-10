import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { func, object, arrayOf } from "prop-types";
import {
  loadEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
} from "../actions/employeeActions";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  form: {
    textAlign: "center",
  },
  employeeList: {
    marginBottom: "1rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #ccc",
    width: "60vw",
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputField: {
    marginRight: "1rem",
  },
  inputFieldContainer: {
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Admin = ({
  employees,
  errors,
  addEmployee,
  deleteEmployee,
  loadEmployees,
  updateEmployee,
}) => {
  const [name, setName] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [evaluationEdit, setEvaluationEdit] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [editEmployeeId, setEditEmployeeId] = useState("");
  const [isReviewer, setIsReviewer] = useState(false);
  const [isReviewerEdit, setIsReviewerEdit] = useState(false);
  const [updatedErrors, setUpdatedErrors] = useState([{}]);
  const classes = useStyles();

  const onChange = (e) => {
    const { value } = e.target;

    switch (e.target.id) {
      case "name":
        return setName(value);
      case "evaluation":
        return setEvaluation(value);
      case "nameEdit":
        return setNameEdit(value);
      case "evaluationEdit":
        return setEvaluationEdit(value);
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      case "confirmPw":
        return setConfirmPw(value);
      default:
        return;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "" || evaluation.trim() === "") return;

    const employee = {
      name,
      email,
      password,
      confirmPw,
      evaluation,
      isReviewer,
    };
    addEmployee(employee);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPw("");
    setEvaluation("");
    setIsReviewer(false);
    setUpdatedErrors([{}]);
  };

  const onDeleteEmployee = (e) => {
    const employeeId = e.target.parentNode.dataset.employeeId;

    if (employeeId) {
      deleteEmployee(employeeId);
    }
  };

  const onEditEmployee = (name, evaluation, isReviewer, e) => {
    const employeeId = e.target.parentNode.dataset.employeeId;

    setNameEdit(name);
    setEvaluationEdit(evaluation);
    setIsReviewerEdit(isReviewer);
    setEditEmployeeId(employeeId);
  };

  const onEditCancel = () => {
    setEditEmployeeId("");
    setNameEdit("");
    setEvaluationEdit("");
    setIsReviewerEdit(false);
  };

  const onUpdate = (e) => {
    e.preventDefault();
    if (nameEdit.trim() === "" || evaluationEdit.trim() === "") return;

    const employeeId = e.target.dataset.employeeId;
    const updatedEmployee = {
      name: nameEdit,
      evaluation: evaluationEdit,
      isReviewer: isReviewerEdit,
    };
    updateEmployee(employeeId, updatedEmployee);
    setEditEmployeeId("");
    setNameEdit("");
    setEvaluationEdit("");
    setIsReviewerEdit(false);
  };

  const showEployeesList = () => {
    const employeesList = employees.map((employee) => {
      return (
        <div key={employee._id} className={classes.employeeList}>
          {editEmployeeId === employee._id ? (
            <>
              <form
                className={classes.form}
                noValidate
                onSubmit={onUpdate}
                data-employee-id={employee._id}
              >
                <div className={classes.inputFieldContainer}>
                  <TextField
                    onChange={onChange}
                    value={nameEdit}
                    id="nameEdit"
                    label="Name"
                    className={classes.inputField}
                  />
                  <TextField
                    onChange={onChange}
                    value={evaluationEdit}
                    id="evaluationEdit"
                    label="Evaluation"
                    multiline
                    rows={1}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={handleReviewerChange}
                        checked={isReviewerEdit}
                        id="isReviewerEdit"
                        color="primary"
                        name="isReviewerEdit"
                      />
                    }
                    label="Reviewer"
                  />
                </div>
                <Button
                  type="button"
                  variant="contained"
                  onClick={onEditCancel}
                  className={classes.inputField}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Update
                </Button>
              </form>
            </>
          ) : (
            <>
              <div>Name: {employee.name}</div>
              <div>Evaluation: {employee.evaluation}</div>
              <div>
                Reviewer: {employee.isReviewer === true ? "true" : "false"}
              </div>
              <Button
                type="button"
                variant="contained"
                onClick={onDeleteEmployee}
                data-employee-id={employee._id}
                className={classes.inputField}
              >
                Delete
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={(e) =>
                  onEditEmployee(
                    employee.name,
                    employee.evaluation,
                    employee.isReviewer,
                    e
                  )
                }
                data-employee-id={employee._id}
              >
                Edit
              </Button>
            </>
          )}
        </div>
      );
    });

    return <div>{employeesList}</div>;
  };

  const handleReviewerChange = (e) => {
    e.target.id === "isReviewer"
      ? setIsReviewer(!isReviewer)
      : setIsReviewerEdit(!isReviewerEdit);
  };

  const isFirstErrorsUpdate = useRef(true);

  useEffect(() => {
    if (isFirstErrorsUpdate.current) {
      isFirstErrorsUpdate.current = false;
      return;
    }
    setUpdatedErrors(errors);
  }, [errors]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <h2>Admin Page</h2>
        <h1>Employee Performance Review</h1>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <div className={classes.inputFieldContainer}>
            <TextField
              onChange={onChange}
              value={name}
              id="name"
              label="Name"
              className={classes.inputField}
            />
            <TextField
              onChange={onChange}
              value={email}
              error={!!updatedErrors[0].email}
              className={classnames(classes.inputField, {
                invalid: !!updatedErrors[0].email,
              })}
              id="email"
              label="Email"
            />
            <TextField
              onChange={onChange}
              value={password}
              error={!!updatedErrors[0].password}
              className={classnames(classes.inputField, {
                invalid: !!updatedErrors[0].password,
              })}
              id="password"
              label="Password"
            />
            <TextField
              onChange={onChange}
              value={confirmPw}
              error={!!updatedErrors[0].confirmPw}
              className={classnames(classes.inputField, {
                invalid: !!updatedErrors[0].confirmPw,
              })}
              id="confirmPw"
              label="Confirm Password"
            />
            <TextField
              onChange={onChange}
              value={evaluation}
              id="evaluation"
              label="Evaluation"
              multiline
              rows={1}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleReviewerChange}
                  checked={isReviewer}
                  id="isReviewer"
                  color="primary"
                  name="isReviewer"
                />
              }
              label="Reviewer"
            />
          </div>
          <Button type="submit" variant="contained">
            Add Employee
          </Button>
        </form>
        <div className={classes.form}>
          <h2>List of Employees</h2>
          {showEployeesList()}
        </div>
      </Paper>
    </Grid>
  );
};

Admin.propTypes = {
  addEmployee: func,
  deleteEmployee: func,
  loadEmployees: func,
  updateEmployee: func,
  errors: arrayOf(object),
};

const mapStateToProps = ({ employees, errors }) => ({
  employees: employees.employees,
  errors: errors.errors,
});

export default connect(mapStateToProps, {
  addEmployee,
  deleteEmployee,
  loadEmployees,
  updateEmployee,
})(Admin);
