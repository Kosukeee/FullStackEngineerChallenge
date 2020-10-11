import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { object, shape, bool } from "prop-types";

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAdmin ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

AdminRoute.propTypes = {
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

export default connect(mapStateToProps)(AdminRoute);
