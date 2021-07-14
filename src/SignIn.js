import React, { useEffect, useContext, useState } from "react";
import "./App.css";
import Button from "./Button";
import firebase from "./utils/firebase";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { DispatchContext } from "./contexts/userContext";
import { DispatchAmountContext } from "./contexts/amountContext";

const provider = new firebase.auth.GoogleAuthProvider();

const SignIn = () => {
  const [usersList, setUsersList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();
  const Dispatch = useContext(DispatchContext);
  const DispatchAmount = useContext(DispatchAmountContext);

  const getUser = () => {
    const userRef = firebase.database().ref("Party");
    const list = [];
    userRef.on("value", (snapshot) => {
      const users = snapshot.val();
      for (let id in users) {
        list.push({ id, ...users[id] });
      }
    });
    return list;
  };

  const createUser = (userData) => {
    const userRef = firebase.database().ref("Party");
    const party = {
      userId: userData.id,
      name: userData.name,
      email: userData.email,
      spinned: false,
      amount: "",
      upi: "",
    };
    userRef.push(party);
  };

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        console.log(res);
        const userData = res.additionalUserInfo.profile;
        const token = res.credential.accessToken;
        if (
          usersList.filter((user) => user.userId === userData.id).length === 0
        ) {
          createUser(userData);
          setRefresh(!refresh);
        }
        Dispatch({
          type: "IN",
          token: token,
        });
        DispatchAmount({
          type: "IN",
          data: usersList.filter((user) => user.userId === userData.id)[0],
        });
        setTimeout(() => {
          history.push("/");
        }, 200);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setUsersList(getUser());
  }, [refresh]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      if (token.token !== "") {
        history.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="signup-container">
      <Button title="sign with google" onClick={handleLogin} />
      <p className="text">use your KIET Account to continue</p>
    </div>
  );
};

export default SignIn;
