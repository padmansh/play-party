import React, { useContext } from "react";
import "./App.css";
import SignIn from "./SignIn";
import Spin from "./Spin";
import UPI from "./UPI";
import End from "./End";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "./contexts/userContext";
import { AmountContext } from "./contexts/amountContext";

const App = () => {
  const Data = useContext(AuthContext);
  const Amount = useContext(AmountContext);

  const AnimatedSwitch = () => (
    <Switch>
      <Route
        exact
        path="/"
        component={
          Data.token !== ""
            ? Amount.data.spinned === false
              ? Spin
              : Amount.data.upi === ""
              ? UPI
              : End
            : SignIn
        }
      />
    </Switch>
  );

  return (
    <div className="container">
      <div className="bg-head">play to party</div>
      <div className="inner-container">
        <AnimatedSwitch />
      </div>
    </div>
  );
};

export default App;
