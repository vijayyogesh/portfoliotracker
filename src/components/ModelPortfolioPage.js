import { React, useEffect, useState } from "react";
import { getModelPortfolio, getSyncModelPortfolio } from "../api/portfolioApi";
import { DataGrid } from "@mui/x-data-grid";

let rows = [];

function ModelPortfolioPage(props) {
  const [rowsUpdated, setRowsUpdated] = useState(false);

  /* Fetch Model Portfolio/Sync data from api and merge */
  async function fetchModelPortfolio() {
    let modelPfResponse = await getModelPortfolio(props.userTokenObj);
    let syncModelResponse = await getSyncModelPortfolio(props.userTokenObj);

    let syncModelMap = new Map();
    for (let adjustedHolding of syncModelResponse.AdjustedHoldings) {
      syncModelMap.set(adjustedHolding.securityid, adjustedHolding);
    }

    rows = [];
    for (let security of modelPfResponse.Securities) {
      let adjustedHolding = syncModelMap.get(security.securityid);
      let row = { ...security, ...adjustedHolding };
      rows.push(row);
    }
    setRowsUpdated(true);
  }

  useEffect(() => {
    fetchModelPortfolio();
  }, []);

  const columns = [
    { field: "securityid", headerName: "Company", minWidth: 200, flex: 1 },
    {
      field: "reasonablePrice",
      headerName: "Reasonable Price",
      minWidth: 75,
      flex: 1,
    },
    {
      field: "expectedAllocation",
      headerName: "Allocation",
      minWidth: 75,
      flex: 1,
    },
    {
      field: "adjustedAmount",
      headerName: "Adjusted Amt",
      minWidth: 75,
      flex: 1,
    },
    {
      field: "belowReasonablePrice",
      headerName: "BRP",
      minWidth: 50,
      flex: 1,
    },
    {
      field: "percentBelowReasonablePrice",
      headerName: "% BRP",
      minWidth: 50,
      flex: 1,
    },
  ];

  return (
    <>
      {rowsUpdated ? (
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.securityid}
        />
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}

export default ModelPortfolioPage;
