import React from "react";
import { func, object } from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

const Admin = ({ logoutUser, auth }) => {
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser();
  };
  const { user } = auth;

  return (
    <div>
      <div>Admin Page</div>
      <button onClick={onLogoutClick}>Logout</button>
    </div>
  );
};

Admin.propTypes = {
  logoutUser: func.isRequired,
  auth: object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Admin);
