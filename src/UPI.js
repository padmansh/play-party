import React, { useState, useContext, useEffect } from "react";
import Button from "./Button";
import firebase from "./utils/firebase";
import Token from "./Token";
import { AmountContext, DispatchAmountContext } from "./contexts/amountContext";
import BarLoader from "react-spinners/BarLoader";

const UPI = () => {
  const [input, setInput] = useState("");
  const arr = [0, 1, 2];
  const Data = useContext(AmountContext);
  const [amount, setAmount] = useState(null);
  const DispatchAmount = useContext(DispatchAmountContext);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setInput({ [e.target.name]: e.target.value });
  };

  const handleUPI = () => {
    const user = firebase.database().ref("Party").child(Data.data.id);
    user.update({
      upi: input.upi,
    });
    DispatchAmount({
      type: "IN",
      data: {
        ...Data.data,
        upi: input.upi,
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    const userRef = firebase.database().ref("Party");
    const list = [];
    userRef.on("value", (snapshot) => {
      const users = snapshot.val();
      for (let id in users) {
        list.push({ id, ...users[id] });
      }
      setAmount(list.filter((e) => e.id === Data.data.id)[0].amount);
      setLoading(false);
    });
    //eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <BarLoader
          height={4}
          color={"#fcffdf"}
          css={{ display: "inherit" }}
          width={300}
        />
      ) : (
        <>
          <div className="display">
            {arr.map((id) => (
              <div className="slot" key={id}>
                <section>
                  <div className="slot-container">
                    <Token amount={amount ? amount[id] : 0} />
                  </div>
                </section>
              </div>
            ))}

            <div className="input-container">
              <div>
                <input
                  placeholder="enter UPI"
                  className="upi-input"
                  name="upi"
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <Button
                title="join the party"
                onClick={() => input && handleUPI()}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UPI;
