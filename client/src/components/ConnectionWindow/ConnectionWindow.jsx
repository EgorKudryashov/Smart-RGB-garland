import React from "react";
import classes from "./window.module.css";

const ConnectionWindow = ({ visible, setVisible }) => {
  const rootClasses = [classes.ground];

  if (!visible) {
    rootClasses.push(classes.active);
  }

  return (
    <div className={rootClasses.join(" ")}>
      <div className={classes.content}>
        Отсутсвует подключение к устройству{" "}
        <button onClick={() => setVisible(!visible)}></button>
      </div>
    </div>
  );
};

export default ConnectionWindow;
