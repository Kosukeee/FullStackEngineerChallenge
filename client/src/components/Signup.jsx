import React, { useState, useEffect, useRef } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { signupUser } from "../actions/authActions";
import classnames from "classnames";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  headline: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  form: {
    textAlign: 'center'
  },
  textField: {
    margin: '0 1rem',
  },
  inputFieldContainer: {
    marginBottom: '1rem',
  }
}));

const Signup = ({ signupUser, history, auth, errors }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [updatedErrors, setUpdatedErrors] = useState({});
  const classes = useStyles();

  const onChange = e => {
    const { value } = e.target;

    switch(e.target.id) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      case 'confirmPw':
        return setConfirmPw(value);
      default:
        return;
    }
  }

  const onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
      confirmPw,
    }
    signupUser(newUser, history);
  }

  const isFirstErrorsUpdate = useRef(true);

  useEffect(() => {
    if (isFirstErrorsUpdate.current) {
      isFirstErrorsUpdate.current = false;
      return;
    }
    setUpdatedErrors(errors)
  }, [errors])

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push('/');
    }
  });

  return (
    <Grid item xs={12}>
      <h1 className={classes.headline}>Sign Up</h1>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <div className={classes.inputFieldContainer}>
          <TextField onChange={onChange} value={name} error={updatedErrors.name} className={classnames(classes.textField, { invalid: updatedErrors.name })} id="name" label="Name" />
          <TextField onChange={onChange} value={email} error={updatedErrors.email} className={classnames(classes.textField, { invalid: updatedErrors.email })} id="email" label="Email" />
          <TextField onChange={onChange} value={password} error={updatedErrors.password} className={classnames(classes.textField, { invalid: updatedErrors.password })} id="password" label="Password" />
          <TextField onChange={onChange} value={confirmPw} error={updatedErrors.confirmPw} className={classnames(classes.textField, { invalid: updatedErrors.confirmPw })} id="confirmPw" label="Confirm Password" />
        </div>
        <Button type="submit" variant="contained">Sign Up</Button>
      </form>
    </Grid>
  )
};

Signup.propTypes = {
  signupUser: func.isRequired,
  auth: object.isRequired,
  errors: object.isRequired
};

const mapStateToProps = ({ auth, errors }) => {
  return (
    {
      auth,
      errors
    }
  )
};

export default connect(mapStateToProps, { signupUser })(Signup);