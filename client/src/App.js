import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Home from "./components/Home";
import NavMenu from "./components/NavMenu";
import Signup from "./components/Signup";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./components/Admin";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

if (localStorage.jwtToken) {
  const token = localStorage.jwt_decode;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/logout";
  }
}

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <Router>
        <div className={classes.root}>
          <Grid container>
            <NavMenu />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <PrivateRoute exact path="/admin" component={Admin} />
            </Switch>
          </Grid>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
