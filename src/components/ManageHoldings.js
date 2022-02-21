import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { fetchAllCompanies, addHoldings } from "../api/portfolioApi";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./ManageHoldings.css";
import { Redirect } from "react-router-dom";

function ManageHoldings(props) {
  const [companies, setCompanies] = useState([]);
  const [holding, setHolding] = useState({
    companyid: "",
    quantity: "",
    buyPrice: "",
    buyDate: "2021-01-01",
  });
  const [userAdded, setUserAdded] = useState(Boolean);

  /* Load unique list of companies for dropdown */
  useEffect(() => {
    setUserAdded(false);
    async function fetchData() {
      let response = await fetchAllCompanies(props.userTokenObj);
      setCompanies(response);
    }
    fetchData();
  }, [props]);

  /* Handle change for all elements except AutoComplete */
  function handleChange(event) {
    const updatedHolding = {
      ...holding,
      [event.target.name]: event.target.value,
    };
    setHolding(updatedHolding);
  }

  /* Handle AutoComplete */
  function handleAutoCompleteChange(event, value) {
    const updatedHolding = {
      ...holding,
      companyid: value.CompanyId,
    };
    setHolding(updatedHolding);
  }

  /* Call API on Submit */
  async function handleSubmit(event) {
    event.preventDefault();
    let holdingArr = [];
    holdingArr[0] = holding;
    addHoldings(props.userTokenObj, holdingArr);
    setUserAdded(true);
  }

  /* Redirect to Holdings List page when new holding is added */
  if (userAdded) {
    return <Redirect to="/holdings" />;
  }

  return (
    <>
      <h2>Manage Holdings</h2>
      <div className="holdingsform-wrapper">
        <form>
          <div className="form-group">
            <Autocomplete
              id="companies-autocomplete"
              onChange={handleAutoCompleteChange}
              options={companies}
              getOptionLabel={(option) => option.CompanyName}
              isOptionEqualToValue={(option, value) =>
                option.CompanyName === value.CompanyName
              }
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Enter Company" required />
              )}
            />
          </div>
          <div className="form-group">
            <TextField
              label="Quantity"
              type="number"
              name="quantity"
              onChange={handleChange}
              required
            ></TextField>
          </div>
          <div className="form-group">
            <TextField
              label="Buy Price"
              name="buyPrice"
              type="number"
              onChange={handleChange}
              required
            ></TextField>
          </div>
          <div className="form-group">
            <TextField
              id="buyDate"
              name="buyDate"
              type="date"
              value={holding.buyDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ManageHoldings;
