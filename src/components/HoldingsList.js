import { React, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react/cjs/react.development";
import "./HoldingsList.css";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SellHoldingForm from "./SellHoldingForm";

let rows = [];

function HoldingsList(props) {
  const [rowsUpdated, setRowsUpdated] = useState(false);
  const [rowSelected, setSelectedRow] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: "companyName", headerName: "Company", minWidth: 250, flex: 1 },
    { field: "quantity", headerName: "Qty", minWidth: 75, flex: 1 },
    { field: "buyPrice", headerName: "Buy Price", minWidth: 75, flex: 1 },
    { field: "ltp", headerName: "LTP", minWidth: 100, flex: 1 },
    { field: "currentValue", headerName: "Current Val", minWidth: 75, flex: 1 },
    { field: "pl", headerName: "PL", minWidth: 75, flex: 1 },
    { field: "netPct", headerName: "Net %", minWidth: 75, flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 75,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton>
            <div>
              <DeleteOutlineIcon
                onClick={() => {
                  console.log(params.row);
                  setSelectedRow(params.row);
                  handleOpen();
                }}
                style={{ color: "gray" }}
              ></DeleteOutlineIcon>
            </div>
          </IconButton>
        </>
      ),
    },
  ];

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
          {open ? (
            <SellHoldingForm
              open={open}
              row={rowSelected}
              onClose={handleClose}
              userTokenObj={props.userTokenObj}
            ></SellHoldingForm>
          ) : (
            <></>
          )}
        </>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}

export default HoldingsList;
