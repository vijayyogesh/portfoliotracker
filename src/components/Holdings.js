import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHoldings } from "./../api/portfolioApi";
import HoldingsList from "./HoldingsList";

function Holdings() {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      console.log("useEffect 1 - " + holdings);
      let response = await getHoldings();
      response = await response.json();
      setHoldings(response);
      console.log("useEffect 2 - " + holdings);
    }

    fetchMyAPI();
  }, []);

  console.log("Log 1 - " + holdings);
  const isHoldingsAvailable = holdings.Holdings !== undefined;

  return (
    <>
      <h2>Holdings Page</h2>

      {isHoldingsAvailable ? (
        <HoldingsList holdings={holdings} />
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}

export default Holdings;
