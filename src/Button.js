import React from "react";
import "./App.css";

const Button = ({ title, style, onClick, ref }) => {
  return (
    <button className="custom-button" onClick={onClick} style={style} ref={ref}>
      <p className="button-text">{title}</p>
    </button>
  );
};

export default Button;
