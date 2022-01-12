import React, { useState } from "react";
import Header from "./Header";
import { Route } from "react-router-dom";
import Holdings from "./Holdings";
import HomePage from "./HomePage";
import Login from "./Login";

function App() {
  const [token, setToken] = useState();
  if (!token) {
    return <Login setToken={setToken}></Login>;
  }

  return (
    <>
      <Header />
      <Route path="/" exact component={HomePage} />
      <Route path="/homepage" component={HomePage} />
      <Route path="/holdings" component={Holdings} />
      <Route path="/login" component={Login} />
    </>
  );
}

export default App;
