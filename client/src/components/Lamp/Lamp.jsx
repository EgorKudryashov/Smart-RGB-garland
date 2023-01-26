import React, { useState } from "react";
import classes from "./lamp.module.css";
import RGBSelector from "../RGBselector/RGBSelector";
import { garland } from "../../garland";

const Lamp = ({ id, color, change, setChange }) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  function ChooseColor() {
    setColorPickerVisible(true);
  }
  function SetColor(color) {
    garland[id].color = color;
    console.log(garland);

    setChange(!change);
    setColorPickerVisible(false);
  }

  return (
    <div className={classes.lamp}>
      {colorPickerVisible ? (
        <RGBSelector color={color} setColor={SetColor} />
      ) : (
        <div
          onClick={() => ChooseColor()}
          className={classes.color}
          style={{ background: color }}
        ></div>
      )}
    </div>
  );
};

export default Lamp;
