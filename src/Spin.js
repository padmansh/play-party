import React, { useRef, useContext } from "react";
import Button from "./Button";
import Token from "./Token";
import { useHistory } from "react-router-dom";
import firebase from "./utils/firebase";
import { DispatchAmountContext, AmountContext } from "./contexts/amountContext";

const Spin = () => {
  const history = useHistory();
  const maxAmt1 = [0, 1, 2, 3, 4];
  const maxAmt2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let slot1;
  let slot2;
  let slot3;
  const Data = useContext(AmountContext);
  const DispatchAmount = useContext(DispatchAmountContext);

  const slotsRef = [useRef(), useRef(), useRef()];

  const updateSpinAmount = () => {
    const user = firebase.database().ref("Party").child(Data.data.id);
    user.update({
      spinned: true,
      amount: `${slot1}${slot2}${slot3}`,
    });
    DispatchAmount({
      type: "IN",
      data: {
        ...Data.data,
        spinned: true,
        amount: `${slot1}${slot2}${slot3}`,
      },
    });
  };

  const setTop = (ref, top, i) => {
    ref.classList.add(`transform`);
    ref.classList.add(`delay-${i}`);
    ref.classList.add(`scroll${top}`);
  };

  const roll = () => {
    slotsRef.forEach((slot, i) => {
      const selected = triggerSlotRotation(slot.current, i);
      if (i === 0) {
        slot1 = selected;
      } else if (i === 1) {
        slot2 = selected;
      } else {
        slot3 = selected;
      }
    });
    updateSpinAmount();
    setTimeout(() => {
      history.push({
        pathname: "/upi",
      });
    }, 4000);
  };

  const triggerSlotRotation = (ref, i) => {
    let options = ref.children;
    let randomOption = Math.floor(Math.random() * options.length);
    let choosenOption = options[randomOption];
    setTop(ref, -choosenOption.offsetTop + 40, i);
    return options.length > 5 ? maxAmt2[randomOption] : maxAmt1[randomOption];
  };

  return (
    <div>
      {slotsRef.map((ref, id) => (
        <div className="slot" key={id}>
          <section>
            <div className="slot-container" ref={ref}>
              {(id === 0 ? maxAmt1 : maxAmt2).map((e, i) => (
                <Token amount={e} key={i} />
              ))}
            </div>
          </section>
        </div>
      ))}

      <Button
        title="spin"
        style={{ marginTop: "1.50rem", width: "67%" }}
        onClick={roll}
      />
      <p className="text">max 499</p>
    </div>
  );
};

export default Spin;
