import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHoldings } from "../api/portfolioApi";
import HoldingsList from "./HoldingsList";
import Button from "@mui/material/Button";

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
      {isDataLoaded ? (
        <>
          <HoldingsList holdings={holdings} />
          <p>
            <Link to="/holding">
              <Button variant="contained">Add Holding</Button>
            </Link>
          </p>
        </>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}

export default HoldingsPage;
