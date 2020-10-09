import React from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from "react-router-dom";
import { logoutUser } from "../actions/authActions";
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
  }
}));

const showAuthButton = (auth, classes, history, logoutUser) => {
  const onLogoutClick = (e) => {
    e.preventDefault();
    logoutUser(history);
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
        <Link to="/signup"className={classes.button}>Sign Up</Link>
        <Link to="/login"className={classes.button}>Log In</Link>
      </>
    )
  }
}

const NavMenu = ({ auth, logoutUser, history }) => {
  const classes = useStyles();

  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.button}>Home</Link>
      {showAuthButton(auth, classes, history, logoutUser)}
    </nav>
  )
};

NavMenu.propTypes = {
  logoutUser: func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps, { logoutUser })(NavMenu));