import { React, useEffect, useState } from "react";
import { getModelPortfolio } from "../api/portfolioApi";
import { DataGrid } from "@mui/x-data-grid";

let rows = [];

function ModelPortfolioPage(props) {
  const [rowsUpdated, setRowsUpdated] = useState(false);

  /* Fetch Model POrtfolio data from api */
  async function fetchModelPortfolio() {
    let response = await getModelPortfolio(props.userTokenObj);
    rows = [];
    for (let security of response.Securities) {
      rows.push(security);
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
