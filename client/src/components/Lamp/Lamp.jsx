import React, { useState } from "react";
import classes from "./lamp.module.css";
import RGBSelector from "../RGBselector/RGBSelector";
import { garland } from "../../garland";
import { GetChangeLampColor } from "../../api/GET";

const Lamp = ({ id, color, change, setChange }) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  function ChooseColor() {
    setColorPickerVisible(true);
  }
  function SetColor(color) {
    garland[id].color = color;
    console.log(color);
    let colorRequest = color.substring(1);
    GetChangeLampColor(id, colorRequest);

    setChange(!change);
    setColorPickerVisible(false);
  }
  function CancelClick() {
    setColorPickerVisible(false);
  }

  return (
    <div className={classes.lamp}>
      {colorPickerVisible ? (
        <RGBSelector
          color={color}
          setColor={SetColor}
          setCancel={CancelClick}
        />
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
