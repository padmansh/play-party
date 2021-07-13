import React from "react";
import Button from "./Button";

import { useHistory } from "react-router-dom";
import Token from "./Token";

const UPI = () => {
  const history = useHistory();
  const arr = [0, 1, 2];
  return (
    <div style={{ display: "flex" }}>
      {arr.map((id) => (
        <div className="slot" key={id}>
          <section>
            <div className="slot-container">
              <Token amount={4} />
            </div>
          </section>
        </div>
      ))}

      <div className="input-container">
        <div>
          <input placeholder="enter UPI" className="upi-input" />
        </div>
        <Button title="join the party" onClick={() => history.push("/end")} />
      </div>
    </div>
  );
};

export default UPI;
