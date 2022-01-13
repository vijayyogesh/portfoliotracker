import React, { useState } from "react";
import Header from "./Header";
import { Route, Switch } from "react-router-dom";
import Holdings from "./Holdings";
import HomePage from "./HomePage";
import Login from "./Login";

function App() {
  const [userTokenObj, setUserTokenObj] = useState({
    UserId: "",
    Token: "",
    IsAuthenticated: false,
  });
  if (!userTokenObj.IsAuthenticated) {
    return <Login setUserTokenObj={setUserTokenObj}></Login>;
  }

  return (
    <>
      <Header />
      <Switch>
        <Route
          path="/"
          exact
          render={() => {
            return <HomePage />;
          }}
        />
        <Route path="/homepage" component={HomePage} />
        <Route
          path="/holdings"
          render={() => {
            return <Holdings userTokenObj={userTokenObj} />;
          }}
        />
        <Route path="/login" component={Login} />
      </Switch>
    </>
  );
}

export default App;
