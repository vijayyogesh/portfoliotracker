import React, { useState } from "react";
import Header from "./Header";
import { Route, Switch } from "react-router-dom";
import HoldingsPage from "./HoldingsPage";
import HomePage from "./HomePage";
import Login from "./Login";
import ManageHoldings from "./ManageHoldings";
import Networth from "./Networth";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";

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

const useStyles = makeStyles(() => ({
  menuSliderContainer: {
    width: "100%",
    background: "#511",
    height: "100%",
  },
}));

function App() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [userTokenObj, setUserTokenObj] = useState({
    UserId: "",
    Token: "",
    IsAuthenticated: false,
  });

  /*const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: 240,
      width: `calc(100% - ${240}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  /*const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: 240,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));*/

  if (!userTokenObj.IsAuthenticated) {
    return <Login setUserTokenObj={setUserTokenObj}></Login>;
  }

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AppBar open={open} position="absolute">
          <Toolbar>
            <IconButton
              color="inherit"
              size="large"
              edge="start"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography>Portfolio Tracker</Typography>
          </Toolbar>
        </AppBar>

        <Drawer open={open}>
          <Toolbar>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            <ListItem>
              <ListItemText>Hello</ListItemText>
            </ListItem>
          </List>
        </Drawer>

        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
          }}
        >
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
                return (
                  <>
                    <Toolbar />
                    <ManageHoldings userTokenObj={userTokenObj} />
                  </>
                );
              }}
            />
            <Route
              path="/networth"
              render={() => {
                return (
                  <>
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                      <Grid item xs={12} md={8} lg={9}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 400,
                          }}
                        >
                          <Networth userTokenObj={userTokenObj} />
                        </Paper>
                      </Grid>
                    </Container>
                  </>
                );
              }}
            />
          </Switch>
        </Box>
      </Box>

      <Header />
    </>
  );
}

export default App;
