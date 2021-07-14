import React, { useContext } from "react";
import "./App.css";
import SignIn from "./SignIn";
import Spin from "./Spin";
import UPI from "./UPI";
import End from "./End";
import { Switch, Route } from "react-router-dom";
import { AuthContext } from "./contexts/userContext";
import { AmountContext } from "./contexts/amountContext";

const App = ({ location }) => {
  const Data = useContext(AuthContext);
  const Amount = useContext(AmountContext);

  const PrivateRoute = () => (
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
  );

  return (
    <div className="container">
      <div className="bg-head">play to party</div>
      <div className="inner-container">
        <Switch location={location}>
          <PrivateRoute />
        </Switch>
      </div>
    </div>
  );
};

export default App;
