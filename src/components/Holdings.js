import { React, useEffect } from "react";
import { getHoldings } from "./../api/portfolioApi";

function Holdings() {
  useEffect(() => getHoldings(), []);

  return (
    <>
      <h2>Holdings Page</h2>
    </>
  );
}

export default Holdings;
