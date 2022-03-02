import React from "react";
import "./Login.css";
import LoginForm from "./LoginForm";
import { useState } from "react";
import { getToken } from "./../api/portfolioApi";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
    if (userAuth.IsAuthenticated) {
      props.setUserTokenObj(userAuth);
    }
  }

  return (
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
      <Toolbar />
      <Container maxWidth="lg" sx={{}}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              ml: "auto",
              mr: "auto",
              display: "flex",
              flexDirection: "column",
              height: 250,
              width: 300,
            }}
          >
            <div className="login-wrapper">
              <h2>
                <Typography>Sign In </Typography>
              </h2>
              <LoginForm
                user={user}
                onChange={handleChange}
                onSubmit={handleSubmit}
              />
            </div>
          </Paper>
        </Grid>
      </Container>
    </Box>
  );
}

export default Login;
