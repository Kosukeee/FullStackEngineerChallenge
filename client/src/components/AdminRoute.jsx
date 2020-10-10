import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { object } from "prop-types";

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAdmin ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

AdminRoute.propTypes = {
  auth: object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminRoute);
