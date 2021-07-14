import React, { createContext, useReducer, useEffect } from "react";
import reducer from "./../reducers/amountReducer";

export const AmountContext = createContext(null);
export const DispatchAmountContext = createContext(null);

const AmountProvider = (props) => {
  const defaultVal = { data: "" };
  const [Data, dispatch] = useReducer(reducer, defaultVal, () => {
    let value;
    try {
      value = JSON.parse(
        window.localStorage.getItem("data") || String(defaultVal)
      );
    } catch (e) {
      value = defaultVal;
    }
    return value;
  });

  useEffect(() => {
    window.localStorage.setItem("data", JSON.stringify(Data));
  }, [Data]);

  return (
    <AmountContext.Provider value={Data}>
      <DispatchAmountContext.Provider value={dispatch}>
        {props.children}
      </DispatchAmountContext.Provider>
    </AmountContext.Provider>
  );
};

export default AmountProvider;
