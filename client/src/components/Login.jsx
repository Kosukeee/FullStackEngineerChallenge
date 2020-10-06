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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors] = useState({});
  const classes = useStyles();

  const onChange = e => {
    const { value } = e.target;

    switch(e.target.id) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  }

  const onSubmit = e => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    console.log(userData);
  }

  return (
    <Grid item xs={12}>
      <h1 className={classes.headline}>Log In</h1>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <div>
          <TextField onChange={onChange} value={email} error={errors.email} className={classes.textField} id="email" label="Email" />
          <TextField onChange={onChange} value={password} error={errors.password} className={classes.textField} id="password" label="Password" />
        </div>
        <Button type="submit" variant="contained">Log In</Button>
      </form>
    </Grid>
  )
};

export default Login;