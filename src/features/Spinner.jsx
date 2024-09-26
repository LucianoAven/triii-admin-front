import React from "react";

const Spinner = ({ texto }) => {
  return (
    <>
      <div className="centered-element-spinner-panel">
      <div className="spinner-border" role="status"></div>
      <div className="ml-25less mt-3">{texto}</div>
      </div>
    </>
  );
}

export default Spinner;