import React from "react";

const ListOfModes = () => {
  return (
    <div className="container" style={{ marginTop: "32px" }}>
      <div className="row justify-content-md-center">
        <div className="col col-lg-6">
          <h2>Modes</h2>
          <div className="list-group list-group-numbered">
            <div className="list-group-item active"> 1 mode</div>
            <div className="list-group-item"> 2 mode</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfModes;
