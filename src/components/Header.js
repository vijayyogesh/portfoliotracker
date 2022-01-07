import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Link to="/homepage">Home</Link> | <Link to="/holdings">Holdings</Link>
    </>
  );
}

export default Header;
