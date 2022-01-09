import { React, useEffect, useState } from "react";
import { getHoldings } from "./../api/portfolioApi";
import HoldingsList from "./HoldingsList";

function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);

  async function fetchData() {
    let response = await getHoldings();
    setHoldings(response);
    setDataLoaded(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2>Holdings Page</h2>

      {isDataLoaded ? (
        <HoldingsList holdings={holdings} />
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}

export default Holdings;
