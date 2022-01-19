import React from "react";
import { useEffect } from "react/cjs/react.development";
import { fetchAllCompanies } from "../api/portfolioApi";

function ManageHoldings(props) {
  useEffect(() => {
    console.log(props);
    async function fetchData() {
      let response = await fetchAllCompanies(props.userTokenObj);
      console.log(response);
    }
    fetchData();
  }, [props.userTokenObj]);
  return (
    <>
      <h2>Manage Holdings</h2>
    </>
  );
}

export default ManageHoldings;
