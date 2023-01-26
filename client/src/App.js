import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import ConnectionWindow from "./components/ConnectionWindow/ConnectionWindow";
import ListOfLamp from "./components/ListOfLamp/ListOfLamp";
import { garland } from "./garland";

function App() {
  const [connection, setConnection] = useState(false);
  const [device, setDevice] = useState({
    id: 1,
    name: "smart RGB-garland",
  });

  /* const [garland, setGarland] = useState([
    { id: 0, color: "red" },
    { id: 1, color: "blue" },
    { id: 2, color: "red" },
    { id: 3, color: "blue" },
    { id: 4, color: "red" },
    { id: 5, color: "blue" },
    { id: 6, color: "yellow" },
    { id: 7, color: "blue" },
    { id: 8, color: "green" },
    { id: 9, color: "black" },
  ]);
  */

  return (
    <div className="App">
      <Navbar connection={connection} device={device} />
      {connection ? (
        <ListOfLamp lampList={garland} />
      ) : (
        <ConnectionWindow visible={connection} setVisible={setConnection} />
      )}
    </div>
  );
}

export default App;
