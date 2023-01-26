import React, { useState } from "react";
import Lamp from "../Lamp/Lamp";

const ListOfLamp = ({ lampList }) => {
  const [changeLamp, setChangeLamp] = useState(false);

  return (
    <div className="conteiner">
      <div className="row align-items-center" style={{ margin: "20px" }}>
        {lampList.map((item) => (
          <div
            className="col-2 align-self-center"
            key={item.id}
            style={{ margin: "20px" }}
          >
            <Lamp
              id={item.id}
              color={item.color}
              change={changeLamp}
              setChange={setChangeLamp}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfLamp;
