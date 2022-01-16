import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHoldings } from "../api/portfolioApi";
import HoldingsList from "./HoldingsList";

function HoldingsPage(props) {
  const [holdings, setHoldings] = useState([]);
  const [isDataLoaded, setDataLoaded] = useState(false);

  async function fetchData() {
    let response = await getHoldings(props.userTokenObj);
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
        <>
          <p>
            <Link to="/holding" className="btn btn-primary">
              Add Holding
            </Link>
          </p>
          <HoldingsList holdings={holdings} />
        </>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}

export default HoldingsPage;
