import React from "react";
import "./Login.css";

function LoginForm(props) {
  return (
    <>
      <form>
        <div className="form-group">
          <label>
            <p>Username</p>
            <input
              type="text"
              id="UserId"
              name="UserId"
              className="form-control"
              onChange={props.onChange}
              value={props.user.UserId}
            ></input>
          </label>
        </div>
        <div>
          <label>
            <p>Password</p>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              onChange={props.onChange}
              value={props.user.password}
            ></input>
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={props.onSubmit}
          >
            Log In
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
