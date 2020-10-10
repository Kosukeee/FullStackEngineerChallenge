import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { loadEmployees } from '../actions/employeeActions';
import { loadFeedbacks, postFeedback } from "../actions/feedbackActions";
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
    textAlign: 'center',
    marginBottom: '1rem'
  },
  employeeList: {
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #ccc',
    width: '60vw',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  feedbackWrapper: {
    width: '60vw',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  feedbacksContainer: {
    marginTop: '1rem',
  },
  feedbackButton: {
    marginTop: '1rem',
    marginBottom: '1rem'
  },
  feedback: {
    marginBottom: '1rem'
  },
  feedbackHeadline: {
    fontWeight: 'bold'
  },
  inputFieldContainer: {
    marginBottom: '1rem',
  },
  inputField: {
    marginRight: '1rem',
  },
}));

const Home = ({ currentUser, employees, feedbacks, loadEmployees, postFeedback, loadFeedbacks }) => {
  const [editEmployeeId, setEditEmployeeId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isFeedbackEditing, setIsFeedbackEditing] = useState(false);
  const classes = useStyles();

  const onChange = e => {
    const { value } = e.target;

    setFeedback(value);
  };

  const onPostFeedback = e => {
    e.preventDefault();

    const targetEmployeeId = e.target.dataset.employeeId;
    const newFeedback = {
      targetEmployeeId,
      comment: feedback,
      createdEmployeeId: currentUser.id,
      createdEmployeeName: currentUser.name,
    };
    postFeedback(newFeedback);
    setFeedback('');
    setIsFeedbackEditing(false);
  }

  const onActivateFeedbackForm = (employeeId) => {
    setIsFeedbackEditing(true);
    setEditEmployeeId(employeeId);
  }

  const onCancelClick = () => {
    setIsFeedbackEditing(false);
    setFeedback('');
  }

  const renderFeedbacks = (feedbacks, employee) => {
    const filteredFeedbacks = feedbacks.filter(feedback => feedback.targetEmployeeId === employee._id);
    const feedbackLists = filteredFeedbacks.map(feedback => {
      return (
        <div key={feedback._id} className={classes.feedback}>
          <div>{feedback.comment}</div>
          <div>By: {feedback.createdEmployeeName}</div>
        </div>
      )
    });

    return (
      <div className={classes.feedbacksContainer}>
        <div className={classes.feedbackHeadline}>Feedbacks: </div>
        {feedbackLists}
      </div>
    )
  }

  const renderPostFeedbackButton = (currentUser, employee) => {
    if (currentUser.id !== employee._id) {
      return (
        <Button type="button" variant="contained" onClick={e => onActivateFeedbackForm(employee._id)} className={classes.feedbackButton}>Post Feedback</Button>
      )
    }
    return;
  }

  const showEployeesList = () => {
    const employeesList = employees.map(employee => {
      return (
        <div key={employee._id} className={classes.employeeList}>
          <div>Name: {employee.name}</div>
          <div>Evaluation: {employee.evaluation}</div>
          <div className={classes.feedbackWrapper}>
            {renderFeedbacks(feedbacks, employee)}
            { isFeedbackEditing && editEmployeeId === employee._id ? (
              <form className={classes.form} noValidate onSubmit={onPostFeedback} data-employee-id={employee._id}>
                <div className={classes.inputFieldContainer}>
                  <TextField onChange={onChange} value={feedback} id="feedback" label="Feedback" />
                </div>
                <Button type="submit" variant="contained" className={classes.inputField}>Post Feedback</Button>
                <Button type="button" variant="contained" onClick={onCancelClick}>Cancel</Button>
              </form>
            ) : (
              renderPostFeedbackButton(currentUser, employee)
            ) }
          </div>
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
    loadFeedbacks();
  }, [loadEmployees, loadFeedbacks]);

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <h1>Employee Performance Review</h1>
        <div className={classes.form}>
          <h2>List of Employees (Please post your feedback!)</h2>
          {showEployeesList()}
        </div>
      </Paper>
    </Grid>
  )
}

Home.propTypes = {
  loadEmployees: func,
  postFeedback: func,
  loadFeedbacks: func,
};

const mapStateToProps = ({ auth, feedbacks, employees }) => ({
  currentUser: auth.currentUser,
  employees: employees.employees,
  feedbacks: feedbacks.feedbacks
});

export default connect(mapStateToProps, { loadEmployees, postFeedback, loadFeedbacks })(Home);