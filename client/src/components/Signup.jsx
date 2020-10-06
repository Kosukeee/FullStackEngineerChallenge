import React, { useState } from 'react';
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
  }
}));

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [errors] = useState({});
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
    console.log(newUser);
  }

  return (
    <Grid item xs={12}>
      <h1 className={classes.headline}>Sign Up</h1>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <div>
          <TextField onChange={onChange} value={name} error={errors.name} className={classes.textField} id="name" label="Name" />
          <TextField onChange={onChange} value={email} error={errors.email} className={classes.textField} id="email" label="Email" />
          <TextField onChange={onChange} value={password} error={errors.password} className={classes.textField} id="password" label="Password" />
          <TextField onChange={onChange} value={confirmPw} error={errors.confirmPw} className={classes.textField} id="confirmPw" label="Confirm Password" />
        </div>
        <Button type="submit" variant="contained">Sign Up</Button>
      </form>
    </Grid>
  )
};

export default Signup;