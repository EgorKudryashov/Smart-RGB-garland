import React from "react";
import classes from "./navbar.module.css";

const Navbar = ({ connection, device, isLampsPage, setIsLampsPage }) => {
  return (
    <div className={classes.front}>
      {connection ? (
        <div className="navbar navbar-expand-lg container-fluid">
          <h2 className={classes.item}>{device}</h2>
          <div className="btn-group" style={{ marginLeft: "80px" }}>
            <button
              type="button"
              className={isLampsPage ? "btn-primary" : "btn-outline-primary"}
              style={{ fontSize: "20px" }}
              onClick={() => {
                setIsLampsPage(true);
              }}
            >
              Garland
            </button>
            <button
              type="button"
              className={isLampsPage ? "btn-outline-primary" : "btn-primary"}
              style={{ fontSize: "20px" }}
              onClick={() => {
                setIsLampsPage(false);
              }}
            >
              Modes
            </button>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Navbar;
