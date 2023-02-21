import React, { useState } from "react";
import classes from "./groupElement.module.css";
import RGBSelector from "../RGBselector/RGBSelector";
import { GetChangeLampColor } from "../../api/GET";

const GroupElement = ({ ids, lamps, setLamps, update, setUpdate }) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const defaultColor = { r: 255, g: 255, b: 255 };

  function ChooseColor() {
    setColorPickerVisible(true);
  }

  function SetColor(color) {
    let garland = lamps;

    for (let i = 0; i < ids.length; ++i) {
      garland[ids[i]].r = color.r;
      garland[ids[i]].g = color.g;
      garland[ids[i]].b = color.b;
      GetChangeLampColor(ids[i], color);
    }
    setLamps(garland);
    setColorPickerVisible(false);

    setUpdate(!update);
  }
  function CancelClick() {
    setColorPickerVisible(false);
  }

  return (
    <div className={classes.area}>
      {colorPickerVisible ? (
        <RGBSelector
          color={defaultColor}
          setColor={SetColor}
          setCancel={CancelClick}
        />
      ) : (
        <div
          onClick={() => ChooseColor()}
          className={classes.colorCenter}
        ></div>
      )}
    </div>
  );
};

export default GroupElement;
