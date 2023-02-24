import React, { useEffect, useState } from "react";
import Lamp from "../Lamp/Lamp";
import { setGarlandBrightness } from "../../api/GET";
import GroupElement from "../GroupElement/GroupElement";

const ListOfLamp = ({
  garland,
  setGarland,
  totalLamps,
  setTotalLamps,
  bright,
  setBright,
}) => {
  const [update, setUpdate] = useState(false);

  const [lampGroups, setLampGroups] = useState([[]]);
  const lampInGroup = 6;

  function MakeGroups() {
    let tmp;
    let num_groups = Math.ceil(totalLamps / lampInGroup);
    let groups = new Array(num_groups);
    for (let i = 0; i < num_groups; i++) {
      groups[i] = [];
    }
    for (let i = 0; i < num_groups; ++i) {
      for (let j = 0; j < lampInGroup; ++j) {
        tmp = j + i * lampInGroup;
        if (tmp === totalLamps) {
          break;
        }
        groups[i].push(tmp);
      }
    }
    setLampGroups(groups);
  }

  function setBrightness() {
    let brightness = document.getElementById("input_bright").value;
    if (bright !== brightness) {
      setBright(brightness);
      setGarlandBrightness(brightness);
    }
  }

  //Create lamp groups elements
  useEffect(() => {
    MakeGroups();
  }, [totalLamps]);

  return (
    <div className="conteiner">
      <div className="row" style={{ marginLeft: "70px", marginTop: "20px" }}>
        <h5>Brightness</h5>
        <input
          className="col-2"
          style={{ marginLeft: "12px" }}
          type="text"
          placeholder={bright}
          id="input_bright"
        />
        <button
          className="col-1 btn-success"
          style={{ marginLeft: "5px", width: "10px" }}
          onClick={() => {
            setBrightness();
          }}
        >
          ✓
        </button>
      </div>
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-2" style={{ borderRight: "5px solid teal" }}>
          {lampGroups.map((item, iter) => (
            <div
              className="row"
              key={lampInGroup * 1000 + iter}
              style={{
                marginTop: "25px",
                marginBotton: "25px",
              }}
            >
              <GroupElement
                ids={item}
                lamps={garland}
                setLamps={setGarland}
                update={update}
                setUpdate={setUpdate}
              />
            </div>
          ))}
        </div>
        <div className="row col-10">
          {garland.map((item) => (
            <div
              className="col-2"
              key={item.id}
              style={{
                marginTop: "25px",
                marginBotton: "25px",
              }}
            >
              <Lamp
                id={item.id}
                r={item.r}
                g={item.g}
                b={item.b}
                lamps={garland}
                setChangeLamp={setGarland}
                update={update}
                setUpdate={setUpdate}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListOfLamp;
