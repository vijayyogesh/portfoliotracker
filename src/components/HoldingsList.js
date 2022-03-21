import { React, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react/cjs/react.development";
import "./HoldingsList.css";
import { IconButton, Modal } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

let rows = [];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 220,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

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

          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <Typography>Sell Holding</Typography>
              <br></br>
              <form>
                <div className="form-group">
                  <TextField
                    size="small"
                    label="CompanyId"
                    name="companyid"
                    value={rowSelected ? rowSelected.companyid : ""}
                    disabled
                  ></TextField>
                </div>
                <br />
                <div className="form-group">
                  <TextField
                    size="small"
                    label="Quantity"
                    type="number"
                    name="quantity"
                    value={rowSelected ? rowSelected.quantity : ""}
                    required
                  ></TextField>
                </div>
                <br />
                <div className="form-group">
                  <TextField
                    size="small"
                    label="Sell Price"
                    name="sellPrice"
                    type="number"
                    value={rowSelected ? rowSelected.ltp : ""}
                    required
                  ></TextField>
                </div>
                <br />
                <div className="form-group">
                  <TextField
                    size="small"
                    id="sellDate"
                    name="sellDate"
                    type="date"
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleClose}
                    className="btn btn-primary"
                  >
                    Submit
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    className="btn"
                  >
                    Cancel
                  </Button>
                </div>
                <br />
              </form>
            </Box>
          </Modal>
        </>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}

export default HoldingsList;
