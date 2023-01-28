import React, { useState } from "react";
import { ChromePicker } from "react-color";

const RGBSelector = ({ color, setColor, setCancel }) => {
  const [pickerColor, setPickerColor] = useState(color);

  return (
    <div style={{ zIndex: "3" }}>
      <ChromePicker
        color={pickerColor}
        onChange={(updatedColor) => setPickerColor(updatedColor.hex)}
      />
      <button onClick={() => setColor(pickerColor)} className="btn-success">
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
