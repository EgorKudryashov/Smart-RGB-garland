import React from "react";
import classes from "./navbar.module.css";

const Navbar = ({ connection, device }) => {
  return (
    <div className={classes.front}>
      {connection ? <h2 className={classes.item}>{device.name}</h2> : <div />}
    </div>
  );
};

export default Navbar;
