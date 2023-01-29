import React, { useState } from "react";
import classes from "./lamp.module.css";
import RGBSelector from "../RGBselector/RGBSelector";
import { GetChangeLampColor } from "../../api/GET";

const Lamp = ({ id, color, lamps, setChangeLamp, update, setUpdate }) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  function ChooseColor() {
    setColorPickerVisible(true);
  }
  function SetColor(color) {
    let garland = lamps;
    garland[id].color = color;

    let colorRequest = color.substring(1);
    GetChangeLampColor(id, colorRequest);

    setChangeLamp(garland);
    setColorPickerVisible(false);

    setUpdate(!update);
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
