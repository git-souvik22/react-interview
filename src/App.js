import "./app.css";
import React, { useState } from "react";

const styles = {
  dark: {
    color: "white",
    backgroundColor: "black",
  },
  light: {
    color: "black",
    backgroundColor: "white",
  },
};

function App() {
  const [theme, setTheme] = useState(false);

  const changeTheme = () => {
    setTheme(!theme);
  };
  return (
    <div className="container-fluid" style={theme ? styles.dark : styles.light}>
      <h1>THEME</h1>
      <button
        className={
          theme ? "btn btn-outline-light fs-2" : "btn btn-outline-dark fs-2"
        }
        onClick={changeTheme}
      >
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
