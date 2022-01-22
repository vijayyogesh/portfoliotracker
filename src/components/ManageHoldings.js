import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { fetchAllCompanies } from "../api/portfolioApi";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function ManageHoldings(props) {
  const [companies, setCompanies] = useState([]);
  const [holding, setHoldings] = useState({});

  /* Load unique list of companies for dropdown */
  useEffect(() => {
    async function fetchData() {
      let response = await fetchAllCompanies(props.userTokenObj);
      let compArray = [];
      for (let company of response) {
        compArray.push(company.CompanyName);
      }
      setCompanies(compArray);
    }
    fetchData();
  }, [props]);

  return (
    <>
      <h2>Manage Holdings</h2>
      <form>
        <div className="form-group">
          <Autocomplete
            onChange={(event, value) =>
              console.log(event.target.outerText, value)
            }
            id="combo-box-demo"
            options={companies}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Companies" />
            )}
          />
        </div>
      </form>
    </>
  );
}

export default ManageHoldings;
