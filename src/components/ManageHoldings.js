import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { fetchAllCompanies } from "../api/portfolioApi";

function ManageHoldings(props) {
  const [companyNameInput, setCompanyNameInput] = useState("");
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState("");

  useEffect(() => {
    console.log(props);
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

  function onChange(event) {
    event.preventDefault();
    let userInput = event.target.value.toLowerCase();
    setCompanyNameInput(userInput);
    console.log(userInput);
    console.log(companies);
    let filteredArr = companies.filter((company) =>
      company.toLowerCase().includes(event.target.value)
    );
    console.log(filteredArr);
    setFilteredCompanies(filteredArr);
  }

  return (
    <>
      <h2>Manage Holdings</h2>
      <form>
        <div className="form-group">
          <label>
            <p>Company Name</p>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="form-control"
              onChange={onChange}
              value={companyNameInput}
            ></input>
          </label>
        </div>
        <div>{filteredCompanies}</div>
      </form>
    </>
  );
}

export default ManageHoldings;
