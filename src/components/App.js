import React from "react";
import Header from "./Header";
import { Route } from "react-router-dom";
import Holdings from "./Holdings";
import HomePage from "./HomePage";

function App() {
  return (
    <>
      <Header />
      <Route path="/" exact component={HomePage} />
      <Route path="/homepage" component={HomePage} />
      <Route path="/holdings" component={Holdings} />
    </>
  );
}

export default App;
