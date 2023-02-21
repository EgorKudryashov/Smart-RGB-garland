import React, { useState } from "react";
import classes from "./lamp.module.css";
import RGBSelector from "../RGBselector/RGBSelector";
import { GetChangeLampColor } from "../../api/GET";

const Lamp = ({ id, r, g, b, lamps, setChangeLamp, update, setUpdate }) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  function ChooseColor() {
    setColorPickerVisible(true);
  }
  function SetColor(color) {
    let garland = lamps;
    garland[id].r = color.r;
    garland[id].g = color.g;
    garland[id].b = color.b;

    GetChangeLampColor(id, color);

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
          r={r}
          g={g}
          b={b}
          setColor={SetColor}
          setCancel={CancelClick}
        />
      ) : (
        <div
          onClick={() => ChooseColor()}
          className={classes.color}
          style={{ background: `rgb(${r},${g},${b})` }}
        ></div>
      )}
    </div>
  );
};

export default Lamp;
