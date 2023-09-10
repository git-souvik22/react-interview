import React from "react";

const Child = ({ name, changeName }) => {
  return (
    <div>
      <h1>{name}</h1>
      <button
        onClick={
          name === "Souvik"
            ? () => changeName("Developer")
            : () => changeName("Souvik")
        }
        className="p-2"
      >
        Change Name{" "}
      </button>
    </div>
  );
};

export default Child;
