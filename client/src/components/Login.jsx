import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { func, object } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  headline: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  form: {
    textAlign: "center",
  },
  textField: {
    margin: "0 1rem",
  },
  inputFieldContainer: {
    marginBottom: "1rem",
  },
}));

const Login = ({ loginUser, history, auth, errors }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const onChange = (e) => {
    const { value } = e.target;

    switch (e.target.id) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
        return;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    loginUser(userData);
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  }, [auth.isAuthenticated, history]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  });

  return (
    <Grid item xs={12}>
      <h1 className={classes.headline}>Log In</h1>
      <form className={classes.form} noValidate onSubmit={onSubmit}>
        <div className={classes.inputFieldContainer}>
          <TextField
            onChange={onChange}
            value={email}
            error={errors.email}
            className={classes.textField}
            id="email"
            label="Email"
          />
          <TextField
            onChange={onChange}
            value={password}
            error={errors.password}
            className={classes.textField}
            id="password"
            label="Password"
          />
        </div>
        <Button type="submit" variant="contained">
          Log In
        </Button>
      </form>
    </Grid>
  );
};

Login.propTypes = {
  loginUser: func.isRequired,
  auth: object.isRequired,
  errors: object.isRequired,
  history: object.isRequired,
};

const mapStateToProps = ({ auth, errors }) => ({
  auth,
  errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
