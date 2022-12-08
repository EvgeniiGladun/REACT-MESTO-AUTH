import React from "react";
import "./Spinner.css";
import RingLoader from "react-spinners/RingLoader";

function Spinner(props) {
  return (
    <div className="spinner-container">
      <RingLoader
        className="spinner"
        color={"#71c4ff"}
        loading={props.loading}
        size={200}
      />
      <h1 className="spinner-text">
        {props.spinnerText ? props.spinnerText : "Loading..."}
      </h1>
    </div>
  );
}

export default Spinner;
