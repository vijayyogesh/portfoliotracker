import React, { useState } from "react";
import Header from "./Header";
import { Route, Switch } from "react-router-dom";
import HoldingsPage from "./HoldingsPage";
import HomePage from "./HomePage";
import Login from "./Login";
import ManageHoldings from "./ManageHoldings";
import Networth from "./Networth";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";

const listItems = [
  {
    listIcon: <HomePage />,
    listText: "Holdings",
  },
  {
    listIcon: <Networth />,
    listText: "Networth",
  },
];

const useStyles = makeStyles((theme) => ({
  menuSliderContainer: {
    width: "100%",
    background: "#511",
    height: "100%",
  },
}));

function App() {
  const classes = useStyles();

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
      <Box component="div" className={classes.menuSliderContainer}>
        <AppBar position="static">
          <Toolbar>
            <IconButton></IconButton>
            <Typography>Portfolio Tracker</Typography>
          </Toolbar>
        </AppBar>
      </Box>

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
        <Route
          path="/networth"
          render={() => {
            return <Networth userTokenObj={userTokenObj} />;
          }}
        />
      </Switch>
    </>
  );
}

export default App;
