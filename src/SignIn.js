import React from "react";
import "./App.css";
import Button from "./Button";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const history = useHistory();
  return (
    <div className="signup-container">
      <Button
        title="sign with google"
        onClick={() => {
          history.push("/spin");
        }}
      />
      <p className="text">use your KIET Account to continue</p>
    </div>
  );
};

export default SignIn;
