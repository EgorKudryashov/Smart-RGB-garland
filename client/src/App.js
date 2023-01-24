import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import ConnectionWindow from "./components/ConnectionWindow/ConnectionWindow";

function App() {
  const [connection, setConnection] = useState(false);
  const [device, setDevice] = useState({
    id: 1,
    name: "smart RGB-garland",
  });

  return (
    <div className="App">
      <Navbar connection={connection} device={device} />
      {connection ? (
        <div></div>
      ) : (
        <ConnectionWindow visible={connection} setVisible={setConnection} />
      )}
    </div>
  );
}

export default App;
