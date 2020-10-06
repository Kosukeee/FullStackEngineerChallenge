import React from 'react';
import { Link } from "react-router-dom";
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1
//   },
// }));

const NavMenu = () => {
  // const classes = useStyles();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </nav>
  )
};

export default NavMenu;