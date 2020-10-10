import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";
import store from "./store";

import {
  setCurrentUser,
  logoutUser,
  setAdminUser,
} from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Home from "./components/Home";
import Admin from "./components/Admin";
import NavMenu from "./components/NavMenu";
import Login from "./components/Login";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

if (localStorage.jwtToken) {
  try {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = "/logout";
    }
  } catch (err) {
    console.log(err);
  }
}

if (localStorage.isAdmin === "true") {
  store.dispatch(setAdminUser());
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
              <PrivateRoute exact path="/" component={Home} />
              <AdminRoute exact path="/admin" component={Admin} />
              <Route path="/login" component={Login} />
            </Switch>
          </Grid>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
