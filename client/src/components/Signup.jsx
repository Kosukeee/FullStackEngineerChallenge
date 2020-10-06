import React from 'react';
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
  textField: {
    margin: '0 1rem',
  }
}));

const Signup = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>Sign Up</Paper>
      <form className={classes.form} action="/signup" method="POST" noValidate>
        <div>
          <TextField className={classes.textField} id="name" label="Name" />
          <TextField className={classes.textField} id="email" label="Email" />
          <TextField className={classes.textField} id="password" label="password" />
        </div>
        <Button type="submit" variant="contained">Sign Up</Button>
      </form>
    </Grid>
  )
};

export default Signup;