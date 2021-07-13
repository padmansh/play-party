import React from "react";
import "./App.css";

const Button = ({ title, style, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick} style={style}>
      <p className="button-text">{title}</p>
    </button>
  );
};

export default Button;
