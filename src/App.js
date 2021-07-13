import "./App.css";
import SignIn from "./SignIn";
import Spin from "./Spin";
import UPI from "./UPI";
import End from "./End";
import {
  Switch,
  Route,
  //  withRouter
} from "react-router-dom";
//import { TransitionGroup, CSSTransition } from "react-transition-group";

// const AnimatedSwitch = withRouter(({ location }) => (
//   <TransitionGroup>
//     <CSSTransition key={location.key} classNames="slide" timeout={1000}>
//       <Switch location={location}>
//         <Route exact path="/spin" component={Spin} />
//         <Route exact path="/end" component={End} />
//         <Route exact path="/" component={SignIn} />
//       </Switch>
//     </CSSTransition>
//   </TransitionGroup>
// ));

const App = ({ location }) => {
  console.log(location, "loc");
  return (
    <div className="container">
      <div className="bg-head">play to party</div>
      <div className="inner-container">
        {/* <AnimatedSwitch /> */}
        <Switch location={location}>
          <Route exact path="/spin" component={Spin} />
          <Route exact path="/upi" component={UPI} />
          <Route exact path="/end" component={End} />
          <Route exact path="/" component={SignIn} />
        </Switch>
        {/* <UPI />  */}
      </div>
    </div>
  );
};

export default App;
