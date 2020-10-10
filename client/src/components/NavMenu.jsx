import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { logoutUser, deleteAdminUser } from "../actions/authActions";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  nav: {
    padding: '2rem 3rem',
  },
  button: {
    textDecoration: 'none',
    marginRight: '1rem',
    color: '#666',
    '&:hover': {
      color: 'blue'
    }
  },
  userName: {
    marginLeft: '1rem',
    color: '#666',
  },
  reviewer: {
    marginLeft: '.5rem',
    color: '#666'
  }
}));

const showAuthButton = (auth, classes, history, logoutUser, deleteAdminUser) => {
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser(history);
    deleteAdminUser();
    localStorage.setItem("isAdmin", false);
  };

  const renderAdminButton = () => {
    if (auth.isAdmin) {
      return <Link to="/admin"className={classes.button}>Admin Page</Link>;
    }
  }

  if (auth.isAuthenticated) {
    return (
      <>
        <Link to="/" onClick={onLogoutClick} className={classes.button}>Logout</Link>
        {renderAdminButton()}
      </>
    )
  } else {
    return (
      <>
        <Link to="/login"className={classes.button}>Log In</Link>
      </>
    )
  }
}

const NavMenu = ({ auth, logoutUser, deleteAdminUser, history }) => {
  const classes = useStyles();

  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.button}>Home</Link>
      {showAuthButton(auth, classes, history, logoutUser, deleteAdminUser)}
      { '|' }
      <span className={classes.userName}>{auth.currentUser.name}</span>
      { auth.currentUser.isReviewer && (
        <span className={classes.reviewer}>(Reviewer)</span>
      ) }
    </nav>
  )
};

NavMenu.propTypes = {
  logoutUser: func.isRequired,
  deleteAdminUser: func.isRequired,
}

const mapStateToProps = ({ auth }) => ({
  auth
});

export default withRouter(connect(mapStateToProps, { logoutUser, deleteAdminUser })(NavMenu));