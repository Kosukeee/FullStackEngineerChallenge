import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { addEmployee, deleteEmployee, updateEmployee } from "../actions/authActions";
import { loadEmployees } from "../actions/homeActions";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from  '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
}));

const Home = ({ employees, addEmployee, deleteEmployee, loadEmployees, updateEmployee }) => {
  const [name, setName] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [nameEdit, setNameEdit] = useState('');
  const [evaluationEdit, setEvaluationEdit] = useState('');
  const [editEmployeeId, setEditEmployeeId] = useState('');
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
      default:
        return;
    }
  };

  const onSubmit = e => {
    e.preventDefault();

    const employee = {
      name,
      evaluation,
    };
    addEmployee(employee);
    setName('');
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

  const showEployeesList = () => {
    const employeesList = employees.map(employee => {
      return (
        <div key={employee._id}>
          {editEmployeeId === employee._id ? (
            <>
              <form className={classes.form} noValidate onSubmit={onUpdate} data-employee-id={employee._id}>
                <div>
                  <TextField onChange={onChange} value={nameEdit} id="nameEdit" label="Name" />
                  <TextField onChange={onChange} value={evaluationEdit} id="evaluationEdit" label="Evaluation" />
                </div>
                <Button type="button" variant="contained" onClick={onEditCancel}>Cancel</Button>
                <Button type="submit" variant="contained">Update</Button>
              </form>
            </>
          ) : (
            <>
              <div>Name: {employee.name}</div>
              <div>Evaluation: {employee.evaluation}</div>
              <Button type="button" variant="contained" onClick={onDeleteEmployee} data-employee-id={employee._id}>Delete</Button>
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
  }, []);

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <h1>Employee Performance Review</h1>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <div>
            <TextField onChange={onChange} value={name} id="name" label="Name" />
            <TextField onChange={onChange} value={evaluation} id="evaluation" label="Evaluation" />
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

Home.propTypes = {
  addEmployee: func,
  deleteEmployee: func,
  loadEmployees: func,
  updateEmployee: func,
};

const mapStateToProps = ({ auth }) => ({
  employees: auth.employees
});

export default connect(mapStateToProps, { addEmployee, deleteEmployee, loadEmployees, updateEmployee })(Home);