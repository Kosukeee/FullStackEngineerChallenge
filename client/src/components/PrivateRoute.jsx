import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { object, shape, bool } from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

PrivateRoute.propTypes = {
  auth: shape({
    currentUser: object,
    isAdmin: bool,
    isAuthenticated: bool,
    isReviewer: bool,
    loading: bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
