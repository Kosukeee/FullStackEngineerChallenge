import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
}));

const NavMenu = () => {
  const classes = useStyles();

  return (
    <Typography>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/signin">Sign In</Link>
      </nav>
    </Typography>
  )
};

export default NavMenu;