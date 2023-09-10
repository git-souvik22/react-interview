import { useState } from "react";
import "./app.css";
import Child from "./Child";

function App() {
  const [name, setName] = useState("Souvik");

  const ChangedName = (value) => {
    setName(value);
  };

  return (
    <div className="container-fluid">
      <Child name={name} changeName={ChangedName} />
    </div>
  );
}

export default App;
