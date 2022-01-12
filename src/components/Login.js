import React from "react";
import "./Login.css";
import LoginForm from "./LoginForm";
import { useState } from "react";
import { getToken } from "./../api/portfolioApi";
import { Redirect } from "react-router-dom";

function Login(props) {
  const [user, setUser] = useState({
    UserId: "",
    password: "",
  });

  function handleChange(event) {
    const updatedUser = {
      ...user,
      [event.target.name]: event.target.value,
    };
    setUser(updatedUser);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let userAuth = await getToken(user);
    console.log(userAuth);
    if (userAuth.IsAuthenticated) {
      props.setToken(userAuth.Token);
    }
  }

  return (
    <div className="login-wrapper">
      <h2>Please Log In </h2>
      <LoginForm user={user} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
