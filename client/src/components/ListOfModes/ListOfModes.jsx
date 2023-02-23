import React from "react";
import { ChooseGarlandMode } from "../../api/GET";

const ListOfModes = ({ activeMode, setActiveMode }) => {
  const modeStyle = (id) => {
    if (activeMode === id) {
      return "list-group-item active";
    } else {
      return "list-group-item";
    }
  };

  function changeMode(id) {
    if (activeMode !== id) {
      setActiveMode(id);
      ChooseGarlandMode(id);
    }
  }

  return (
    <div className="container" style={{ marginTop: "32px" }}>
      <div className="row justify-content-md-center">
        <div className="col col-lg-6">
          <h2>Modes</h2>
          <div className="list-group list-group-numbered">
            <div
              className={modeStyle(0)}
              style={{ userSelect: "none" }}
              id="0"
              onClick={() => {
                changeMode(0);
              }}
            >
              Standard view
            </div>
            <div
              className={modeStyle(1)}
              style={{ userSelect: "none" }}
              id="1"
              onClick={() => {
                changeMode(1);
              }}
            >
              Random Colors
            </div>
            <div
              className={modeStyle(2)}
              style={{ userSelect: "none" }}
              id="2"
              onClick={() => {
                changeMode(2);
              }}
            >
              Blinking
            </div>
            <div
              className={modeStyle(3)}
              style={{ userSelect: "none" }}
              id="3"
              onClick={() => {
                changeMode(3);
              }}
            >
              Fading
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfModes;
