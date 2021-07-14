import React, { useContext } from "react";
import "./App.css";
import SignIn from "./SignIn";
import Spin from "./Spin";
import UPI from "./UPI";
import End from "./End";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./contexts/userContext";

const App = ({ location }) => {
  const Data = useContext(AuthContext);

  const PrivateRoute = ({ component: Component, data, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        Data.token !== "" ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );

  return (
    <div className="container">
      <div className="bg-head">play to party</div>
      <div className="inner-container">
        <Switch location={location}>
          <PrivateRoute exact path="/" component={Spin} />
          <PrivateRoute exact path="/upi" component={UPI} />
          <PrivateRoute exact path="/end" component={End} />
          <Route exact path="/login" component={SignIn} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
