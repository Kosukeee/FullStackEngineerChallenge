import React from 'react';
import { Link } from "react-router-dom";
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

const NavMenu = () => {
  const classes = useStyles();

  return (
    <nav className={classes.nav}>
      <Link to="/" className={classes.button}>Home</Link>
      <Link to="/signup"className={classes.button}>Sign Up</Link>
      <Link to="/login"className={classes.button}>Log In</Link>
    </nav>
  )
};

export default NavMenu;