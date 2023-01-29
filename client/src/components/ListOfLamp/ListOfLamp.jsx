import React, { useEffect, useState } from "react";
import Lamp from "../Lamp/Lamp";
import { GetGarland } from "../../api/GET";

const ListOfLamp = () => {
  const [garland, setGarland] = useState([{ id: 0, color: "red" }]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    GetGarland(setGarland);
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
              lamps={garland}
              setChangeLamp={setGarland}
              update={update}
              setUpdate={setUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfLamp;
