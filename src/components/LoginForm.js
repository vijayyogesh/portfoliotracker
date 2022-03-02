import React from "react";
import "./Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function LoginForm(props) {
  return (
    <>
      <form>
        <div className="form-group">
          <label>
            <TextField
              size="small"
              type="text"
              id="UserId"
              name="UserId"
              className="form-control"
              onChange={props.onChange}
              value={props.user.UserId}
              placeholder="Username"
            ></TextField>
          </label>
        </div>
        <br />
        <div>
          <label>
            <TextField
              size="small"
              type="password"
              id="password"
              name="password"
              className="form-control"
              onChange={props.onChange}
              value={props.user.password}
              placeholder="Password"
            ></TextField>
          </label>
        </div>
        <br />
        <div>
          <Button
            variant="contained"
            type="submit"
            className="btn btn-primary"
            onClick={props.onSubmit}
          >
            Log In
          </Button>
        </div>
        <br />
      </form>
    </>
  );
}

export default LoginForm;
