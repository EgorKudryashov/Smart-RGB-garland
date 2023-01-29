import React from "react";
import classes from "./window.module.css";
import { GetConnection } from "../../api/GET";

const ConnectionWindow = ({ isVisible, setVisible, setDevice }) => {
  const rootClasses = [classes.ground];

  if (!isVisible) {
    rootClasses.push(classes.active);
  }
  const ConnectionToDevice = async () => {
    await GetConnection(setVisible, setDevice);

    //await GetGarland();
  };
  return (
    <div className={rootClasses.join(" ")}>
      <div className={classes.content}>
        Отсутсвует подключение к устройству{" "}
        <button className="btn btn-info" onClick={() => ConnectionToDevice()}>
          {" "}
          🗘
        </button>
      </div>
    </div>
  );
};

export default ConnectionWindow;
