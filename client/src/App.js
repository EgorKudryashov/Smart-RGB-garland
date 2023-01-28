import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import ConnectionWindow from "./components/ConnectionWindow/ConnectionWindow";
import ListOfLamp from "./components/ListOfLamp/ListOfLamp";

import { GetGarland, GetConnection } from "./api/GET";

function App() {
  const [isConnection, setIsConnection] = useState(false);
  const [device, setDevice] = useState("");

  const ConnectionToDevice = async () => {
    await GetConnection(setIsConnection, setDevice);
    console.log(isConnection);
    console.log(device);

    //await GetGarland();
  };

  useEffect(() => ConnectionToDevice, []);

  return (
    <div className="App">
      <Navbar connection={isConnection} device={device} />
      {isConnection ? (
        <ListOfLamp />
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
