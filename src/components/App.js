import React, { useState } from "react";
import Header from "./Header";
import { Route, Switch, Link } from "react-router-dom";
import HoldingsPage from "./HoldingsPage";
import HomePage from "./HomePage";
import Login from "./Login";
import ManageHoldings from "./ManageHoldings";
import Networth from "./Networth";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { List, ListItem, ListItemText, Paper } from "@mui/material";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WorkIcon from "@mui/icons-material/Work";
import ModelPortfolioPage from "./ModelPortfolioPage";

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

function App() {
  /* State to toggle AppBar/Drawer */
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  /* State to Highlight selected ListItem */
  const [selectedItem, setSelectedItem] = useState(1);
  const handleClickForListItem = (event, index) => {
    setSelectedItem(index);
  };

  /* State to validate authentication for each route */
  const [userTokenObj, setUserTokenObj] = useState({
    UserId: "",
    Token: "",
    IsAuthenticated: false,
  });
  if (!userTokenObj.IsAuthenticated) {
    return <Login setUserTokenObj={setUserTokenObj}></Login>;
  }

  const drawerWidth = 240;

  /* Custom App Bar */
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  /* Custom Drawer */
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
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
        /* Set as 0 to completely hide drawer on close */
        width: theme.spacing(0),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(0),
        },
      }),
    },
  }));

  const listItems = [
    {
      listIcon: <Networth />,
      listText: "Home",
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        {/* App Bar */}
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

        {/* Drawer/Nav to hold links to component */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List sx={{ padding: "0" }}>
            <ListItem
              sx={{ padding: "0" }}
              component={Link}
              to="/networth"
              selected={selectedItem === 1}
              onClick={(event) => handleClickForListItem(event, 1)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <ShowChartIcon />
                </ListItemIcon>
                <ListItemText primary="Networth" sx={{ color: "#000000" }} />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem
              sx={{ padding: "0" }}
              component={Link}
              to="/holdings"
              selected={selectedItem === 2}
              onClick={(event) => handleClickForListItem(event, 2)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <WorkIcon />
                </ListItemIcon>
                <ListItemText primary="Holdings" sx={{ color: "#000000" }} />
              </ListItemButton>
            </ListItem>
            <Divider />

            <ListItem
              sx={{ padding: "0" }}
              component={Link}
              to="/modelportfolio"
              selected={selectedItem === 3}
              onClick={(event) => handleClickForListItem(event, 3)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Model Portfolio"
                  sx={{ color: "#000000" }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Drawer>

        {/* Box for Right pane */}
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          {/* Toggle component based on Route */}
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
                return (
                  <>
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                      <Grid item xs={12}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 600,
                          }}
                        >
                          <HoldingsPage userTokenObj={userTokenObj} />
                        </Paper>
                      </Grid>
                    </Container>
                  </>
                );
              }}
            />
            <Route path="/login" component={Login} />
            <Route
              path="/holding"
              render={() => {
                return (
                  <>
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
                      <Grid item xs={12}>
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
            <Route
              path="/modelportfolio"
              render={() => {
                return (
                  <>
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                      <Grid item xs={12}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: 600,
                          }}
                        >
                          <ModelPortfolioPage userTokenObj={userTokenObj} />
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
