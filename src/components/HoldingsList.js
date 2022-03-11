import { React, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react/cjs/react.development";
import "./HoldingsList.css";

const columns = [
  { field: "companyName", headerName: "Company", minWidth: 250, flex: 1 },
  { field: "quantity", headerName: "Qty", minWidth: 75, flex: 1 },
  { field: "buyPrice", headerName: "Buy Price", minWidth: 75, flex: 1 },
  { field: "ltp", headerName: "LTP", minWidth: 100, flex: 1 },
  { field: "currentValue", headerName: "Current Val", minWidth: 75, flex: 1 },
  { field: "pl", headerName: "PL", minWidth: 75, flex: 1 },
  { field: "netPct", headerName: "Net %", minWidth: 75, flex: 1 },
];

let rows = [];

function HoldingsList(props) {
  const [rowsUpdated, setRowsUpdated] = useState(false);

  useEffect(() => {
    rows = [];
    for (let holding of props.holdings.Holdings) {
      rows.push(holding);
    }
    setRowsUpdated(true);
  }, [props]);

  return (
    <>
      {rowsUpdated ? (
        <>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.companyid}
          />
        </>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}

export default HoldingsList;
