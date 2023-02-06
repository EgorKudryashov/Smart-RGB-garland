import React, { useState } from "react";
import classes from "./groupElement.module.css";
import RGBSelector from "../RGBselector/RGBSelector";
import { GetChangeLampColor } from "../../api/GET";

const GroupElement = ({ ids, lamps, setLamps, update, setUpdate }) => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const defaultColor = "#FFFFFF";

  function ChooseColor() {
    setColorPickerVisible(true);
  }

  function SetColor(color) {
    let garland = lamps;

    let colorRequest = color.substring(1);
    for (let i = 0; i < ids.length; ++i) {
      garland[ids[i]].color = color;
      GetChangeLampColor(ids[i], colorRequest);
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
