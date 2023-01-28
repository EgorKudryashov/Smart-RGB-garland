import React, { useEffect, useState } from "react";
import Lamp from "../Lamp/Lamp";
import { GetGarland } from "../../api/GET";
import { garland } from "../../garland";

const ListOfLamp = () => {
  const [changeLamp, setChangeLamp] = useState(false);

  useEffect(() => {
    GetGarland();
  }, []);

  return (
    <div className="conteiner">
      <div className="row align-items-center" style={{ margin: "20px" }}>
        {garland.map((item) => (
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
