import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import { loadEmployees, addEmployee, deleteEmployee, updateEmployee } from "../actions/employeeActions";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from  '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  form: {
    textAlign: 'center'
  },
  employeeList: {
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #ccc',
    width: '60vw',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  inputField: {
    marginRight: '1rem',
  },
  inputFieldContainer: {
    marginBottom: '1rem',
  }
}));

const Admin = ({ employees, errors, addEmployee, deleteEmployee, loadEmployees, updateEmployee }) => {
  const [name, setName] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [nameEdit, setNameEdit] = useState('');
  const [evaluationEdit, setEvaluationEdit] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [editEmployeeId, setEditEmployeeId] = useState('');
  const [updatedErrors, setUpdatedErrors] = useState({});
  const classes = useStyles();

  const onChange = e => {
    const { value } = e.target;

    switch(e.target.id) {
      case 'name':
        return setName(value);
      case 'evaluation':
        return setEvaluation(value);
      case 'nameEdit':
        return setNameEdit(value);
      case 'evaluationEdit':
        return setEvaluationEdit(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      case 'confirmPw':
        return setConfirmPw(value);
      default:
        return;
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    if (name.trim() === '' || evaluation.trim() === '') return;

    const employee = {
      name,
      email,
      password,
      confirmPw,
      evaluation,
    };
    addEmployee(employee);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPw('');
    setEvaluation('');
  };

  const onDeleteEmployee = e => {
    const employeeId = e.target.parentNode.dataset.employeeId;

    if (employeeId) {
      deleteEmployee(employeeId);
    }
  };

  const onEditEmployee = (name, evaluation, e) => {
    const employeeId = e.target.parentNode.dataset.employeeId;

    setNameEdit(name);
    setEvaluationEdit(evaluation);
    setEditEmployeeId(employeeId);
  };

  const onEditCancel = () => {
    setEditEmployeeId('');
  };

  const onUpdate = e => {
    e.preventDefault();
    if (nameEdit.trim() === '' || evaluationEdit.trim() === '') return;

    const employeeId = e.target.dataset.employeeId;
    const updatedEmployee = {
      name: nameEdit,
      evaluation: evaluationEdit,
    };
    updateEmployee(employeeId, updatedEmployee);
    setEditEmployeeId('');
    setNameEdit('');
    setEvaluationEdit('');
  }

  const isFirstErrorsUpdate = useRef(true);

  useEffect(() => {
    if (isFirstErrorsUpdate.current) {
      isFirstErrorsUpdate.current = false;
      return;
    }
    setUpdatedErrors(errors)
  }, [errors]);

  const showEployeesList = () => {
    const employeesList = employees.map(employee => {
      return (
        <div key={employee._id} className={classes.employeeList}>
          {editEmployeeId === employee._id ? (
            <>
              <form className={classes.form} noValidate onSubmit={onUpdate} data-employee-id={employee._id}>
                <div className={classes.inputFieldContainer}>
                  <TextField onChange={onChange} value={nameEdit} id="nameEdit" label="Name" className={classes.inputField} />
                  <TextField onChange={onChange} value={evaluationEdit} id="evaluationEdit" label="Evaluation" multiline rows={1} />
                </div>
                <Button type="button" variant="contained" onClick={onEditCancel} className={classes.inputField}>Cancel</Button>
                <Button type="submit" variant="contained">Update</Button>
              </form>
            </>
          ) : (
            <>
              <div>Name: {employee.name}</div>
              <div>Evaluation: {employee.evaluation}</div>
              <Button type="button" variant="contained" onClick={onDeleteEmployee} data-employee-id={employee._id} className={classes.inputField}>Delete</Button>
              <Button type="button" variant="contained" onClick={e => onEditEmployee(employee.name, employee.evaluation, e)} data-employee-id={employee._id}>Edit</Button>
            </>
          )}
        </div>
      )
    });

    return (
      <div>
        { employeesList }
      </div>
    )
  }

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
            <TextField onChange={onChange} value={name} id="name" label="Name" className={classes.inputField} />
            <TextField onChange={onChange} value={email} error={updatedErrors.email} className={classnames(classes.inputField, { invalid: updatedErrors.email })} id="email" label="Email" />
            <TextField onChange={onChange} value={password} error={updatedErrors.password} className={classnames(classes.inputField, { invalid: updatedErrors.password })} id="password" label="Password" />
            <TextField onChange={onChange} value={confirmPw} error={updatedErrors.confirmPw} className={classnames(classes.inputField, { invalid: updatedErrors.confirmPw })} id="confirmPw" label="Confirm Password" />
            <TextField onChange={onChange} value={evaluation} id="evaluation" label="Evaluation" multiline rows={1} />
          </div>
          <Button type="submit" variant="contained">Add Employee</Button>
        </form>
        <div className={classes.form}>
          <h2>List of Employees</h2>
          {showEployeesList()}
        </div>
      </Paper>
    </Grid>
  )
}

Admin.propTypes = {
  addEmployee: func,
  deleteEmployee: func,
  loadEmployees: func,
  updateEmployee: func,
  errors: object.isRequired
};

const mapStateToProps = ({ employees,errors }) => ({
  employees: employees.employees,
  errors,
});

export default connect(mapStateToProps, { addEmployee, deleteEmployee, loadEmployees, updateEmployee })(Admin);