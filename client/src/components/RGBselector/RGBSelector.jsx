import React, { useState } from "react";
import { ChromePicker } from "react-color";

const RGBSelector = ({ r, g, b, setColor, setCancel }) => {
  const [pickerColor, setPickerColor] = useState({ r: r, g: g, b: b });

  return (
    <div style={{ zIndex: "3" }}>
      <ChromePicker
        color={pickerColor}
        onChange={(updatedColor) => setPickerColor(updatedColor.rgb)}
      />
      <button
        onClick={() => setColor(pickerColor)}
        className="btn-success"
        style={{ marginLeft: "40%" }}
      >
        ✓
      </button>
      <button
        onClick={() => setCancel()}
        className="btn-danger"
        style={{ marginLeft: "20px" }}
      >
        🞪
      </button>
    </div>
  );
};

export default RGBSelector;
