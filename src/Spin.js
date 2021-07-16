import React, { useRef, useContext } from "react";
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
  const buttonRef = useRef();

  const slotsRef = [useRef(), useRef(), useRef()];

  const updateSpinAmount = () => {
    const user = firebase.database().ref("Party").child(Data.data.id);
    user.update({
      spinned: true,
      amount:
        parseInt(`${slot1}${slot2}${slot3}`) > 49
          ? `${slot1}${slot2}${slot3}`
          : "049",
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
    buttonRef.current.classList.add("hidden");
    setTimeout(() => {
      buttonRef.current.classList.add("none");
    }, 400);
    setTimeout(() => {
      DispatchAmount({
        type: "IN",
        data: {
          ...Data.data,
          spinned: true,
          amount:
            parseInt(`${slot1}${slot2}${slot3}`) > 49
              ? `${slot1}${slot2}${slot3}`
              : "049",
        },
      });
      history.push({
        pathname: "/",
      });
    }, 3500);
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
      </div>
      <div ref={buttonRef}>
        <button
          className="custom-button"
          onClick={roll}
          style={{ marginTop: "1.50rem", width: "95%" }}
        >
          <p className="button-text">Spin</p>
        </button>
        <p className="text">max 499</p>
      </div>
    </div>
  );
};

export default Spin;
