import React, { useState } from "react";
import Header from "./Header";
import { Route, Switch } from "react-router-dom";
import HoldingsPage from "./HoldingsPage";
import HomePage from "./HomePage";
import Login from "./Login";
import ManageHoldings from "./ManageHoldings";
import Networth from "./Networth";

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
            return <HoldingsPage userTokenObj={userTokenObj} />;
          }}
        />
        <Route path="/login" component={Login} />
        <Route
          path="/holding"
          render={() => {
            return <ManageHoldings userTokenObj={userTokenObj} />;
          }}
        />
        <Route path="/networth" component={Networth} />
      </Switch>
    </>
  );
}

export default App;
