import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import ConnectionWindow from "./components/ConnectionWindow/ConnectionWindow";
import ListOfLamp from "./components/ListOfLamp/ListOfLamp";

import { GetConnection, GetGarland } from "./api/GET";
import ListOfModes from "./components/ListOfModes/ListOfModes";

function App() {
  const [isConnection, setIsConnection] = useState(false);
  const [device, setDevice] = useState("");

  const [activeMode, setActiveMode] = useState(0);

  const [isLampsPage, setIsLampsPage] = useState(true);

  const [garland, setGarland] = useState([{ id: 0, r: 200, g: 0, b: 0 }]);
  const [totalLamps, setTotalLamps] = useState(0);
  const [bright, setBright] = useState(10);

  const ConnectionToDevice = async () => {
    await GetConnection(setIsConnection, setDevice);
  };

  useEffect(() => {
    ConnectionToDevice();
  }, []);

  //Getting information about garland from server
  useEffect(() => {
    GetGarland(setGarland, setTotalLamps);
  }, [device]);

  return (
    <div className="App">
      <Navbar
        connection={isConnection}
        device={device}
        isLampsPage={isLampsPage}
        setIsLampsPage={setIsLampsPage}
      />
      {isConnection ? (
        isLampsPage ? (
          <ListOfLamp
            garland={garland}
            setGarland={setGarland}
            totalLamps={totalLamps}
            setTotalLamps={setTotalLamps}
            bright={bright}
            setBright={setBright}
          />
        ) : (
          <ListOfModes activeMode={activeMode} setActiveMode={setActiveMode} />
        )
      ) : (
        <ConnectionWindow
          isVisible={isConnection}
          setVisible={setIsConnection}
          setDevice={setDevice}
        />
      )}
    </div>
  );
}

export default App;
