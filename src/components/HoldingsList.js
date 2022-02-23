import { React, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react/cjs/react.development";

const columns = [
  { field: "companyid", headerName: "Company", width: 100 },
  { field: "quantity", headerName: "Qty", width: 75 },
  { field: "buyPrice", headerName: "Buy Price", width: 75 },
  { field: "ltp", headerName: "LTP", width: 75 },
  { field: "currentValue", headerName: "Current Val", width: 75 },
  { field: "pl", headerName: "PL", width: 75 },
  { field: "netPct", headerName: "Net %", width: 75 },
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
