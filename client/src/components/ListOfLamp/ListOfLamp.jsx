import React from "react";

const ListOfLamp = ({ lampList }) => {
  return (
    <div className="conteiner">
      <div className="row" style={{ margin: "20px" }}>
        {lampList.map((item, index = 0) => (
          <div className="col-2" key={++index}>
            <div>{item.color}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListOfLamp;
