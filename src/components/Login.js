import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-wrapper">
      <h2>Please Log In </h2>
      <form>
        <div>
          <label>
            <p>Username</p>
            <input type="text"></input>
          </label>
        </div>
        <div>
          <label>
            <p>Password</p>
            <input type="password"></input>
          </label>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
