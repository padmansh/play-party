import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import Token from "./Token";
import { useHistory } from "react-router-dom";

const Spin = () => {
  const history = useHistory();
  const maxAmt1 = [0, 1, 2, 3, 4];
  const maxAmt2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [slot1, setSlot1] = useState("");
  const [slot2, setSlot2] = useState("");
  const [slot3, setSlot3] = useState("");
  const [refresh, setRefresh] = useState(false);

  const slotsRef = [useRef(), useRef(), useRef()];

  useEffect(() => {
    console.log("u get", slot1, slot2, slot3);
    for (let i = 0; i < 3; i++) {
      console.log(slotsRef[i].current.style.Top, "after", i);
    }
    //eslint-disable-next-line
  }, [refresh]);

  const setTop = (ref, top) => {
    ref.style.Top = `${top}px`;
    setRefresh(!refresh);
  };

  const roll = () => {
    slotsRef.forEach((slot, i) => {
      const selected = triggerSlotRotation(slot.current, i);
      if (i === 0) {
        setSlot1(selected);
      } else if (i === 1) {
        setSlot2(selected);
      } else {
        setSlot3(selected);
      }
    });
    setRefresh(!refresh);
    setTimeout(() => {
      history.push({
        pathname: "/upi",
        state: { slots: [slot1, slot2, slot3] },
      });
    }, 2000);
  };

  const triggerSlotRotation = (ref, i) => {
    let options = ref.children;
    let randomOption = Math.floor(Math.random() * options.length);
    let choosenOption = options[randomOption];
    console.log(-choosenOption.offsetTop + 40, "i", i);
    setTop(ref, -choosenOption.offsetTop + 40);
    setRefresh(!refresh);
    return options.length > 5 ? maxAmt2[randomOption] : maxAmt1[randomOption];
  };

  return (
    <div>
      {slotsRef.map((ref, id) => (
        <div className="slot" key={id}>
          <section>
            <div className="slot-container" ref={ref}>
              {maxAmt1.map((e, i) => (
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
