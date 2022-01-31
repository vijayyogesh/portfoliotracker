import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { fetchAllCompanies } from "../api/portfolioApi";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./ManageHoldings.css";

function ManageHoldings(props) {
  const [companies, setCompanies] = useState([]);
  const [holding, setHolding] = useState({
    companyid: "",
    quantity: "",
    buyPrice: "",
    buyDate: "",
  });

  /* Load unique list of companies for dropdown */
  useEffect(() => {
    async function fetchData() {
      let response = await fetchAllCompanies(props.userTokenObj);
      //console.log(response);
      /*let compArray = [];
      for (let company of response) {
        compArray.push(company.CompanyName);
      }*/
      setCompanies(response);
      console.log(response);
    }
    fetchData();
  }, [props]);

  function handleChange(event) {
    const updatedHolding = {
      ...holding,
      [event.target.name]: event.target.value,
    };
    setHolding(updatedHolding);
    console.log(updatedHolding);
  }

  function handleAutoCompleteChange(event, value) {
    const updatedHolding = {
      ...holding,
      companyid: value.CompanyId,
    };
    setHolding(updatedHolding);
    console.log(updatedHolding);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("In submit");
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
              label="Buy Date"
              type="date"
              defaultValue="2021-01-01"
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
