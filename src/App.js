import { useState } from "react";
import "./app.css";

function App() {
  const [objData, setObjData] = useState({});

  const getInputs = (value, name) => {
    let data = { [name]: value };

    setObjData({ ...objData, ...data });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(objData);
  };

  return (
    <div className="container-fluid">
      <form className="d-flex flex-column gap-4 w-25 bg-white p-3 mt-3 mx-auto">
        <input
          placeholder="Write your Name"
          type="text"
          name="name"
          onChange={(e) => getInputs(e.target.value, e.target.name)}
        />
        <input
          placeholder="Write your Age"
          type="number"
          name="age"
          onChange={(e) => getInputs(e.target.value, e.target.name)}
        />
        <input
          placeholder="Write your Hobby"
          type="text"
          name="hobbies"
          onChange={(e) => getInputs(e.target.value, e.target.name)}
        />
        <input
          type="date"
          name="date"
          onChange={(e) => getInputs(e.target.value, e.target.name)}
        />
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
}

export default App;
