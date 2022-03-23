import React, { useState } from "react";
import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { addHoldings } from "../api/portfolioApi";

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

function SellHoldingForm(props) {
  const [holding, setHolding] = useState({
    companyid: props.row.companyid,
    quantity: props.row.quantity,
    buyPrice: props.row.ltp,
    buyDate: "",
  });

  /* Handle change for all elements except AutoComplete */
  function handleChange(event) {
    const updatedHolding = {
      ...holding,
      [event.target.name]: event.target.value,
    };
    setHolding(updatedHolding);
  }

  /* Call API on Submit */
  async function handleSubmit(event) {
    event.preventDefault();
    let holdingArr = [];
    /* Negate the quantity as it is a sell transaction */
    holding.quantity = (-holding.quantity).toString();
    holdingArr[0] = holding;
    await addHoldings(props.userTokenObj, holdingArr);
    props.onClose();
    /* Reload fetchData() in HoldingsPage.js to refresh data */
    props.reloadData();
  }

  return (
    <>
      <Modal open={props.open} onClose={props.onClose}>
        <Box sx={style}>
          <Typography>Sell Holding</Typography>
          <br></br>
          <form>
            <div className="form-group">
              <TextField
                size="small"
                label="CompanyId"
                name="companyid"
                defaultValue={props.row.companyid}
                onChange={handleChange}
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
                defaultValue={props.row.quantity}
                onChange={handleChange}
                required
              ></TextField>
            </div>
            <br />
            <div className="form-group">
              <TextField
                size="small"
                label="Sell Price"
                name="buyPrice"
                type="number"
                defaultValue={props.row.ltp}
                onChange={handleChange}
                required
              ></TextField>
            </div>
            <br />
            <div className="form-group">
              <TextField
                size="small"
                id="sellDate"
                name="buyDate"
                type="date"
                onChange={handleChange}
                required
              />
            </div>
            <br />
            <div className="form-group">
              <Button
                variant="contained"
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Submit
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                variant="outlined"
                onClick={props.onClose}
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
  );
}

export default SellHoldingForm;
