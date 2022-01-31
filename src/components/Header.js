import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div style={{ height: " 50px" }}>
      <Link to="/homepage">Home</Link> | <Link to="/holdings">Holdings</Link>
    </div>
  );
}

export default Header;
