import React from "react";
import { useEffect } from "react/cjs/react.development";
import { getNetworth } from "../api/portfolioApi";

function Networth(props) {
  useEffect(() => {
    async function fetchData() {
      let response = await getNetworth(props.userTokenObj);
      console.log(response);
    }
    fetchData();
  }, [props]);

  return (
    <>
      <div>Networth Page</div>
    </>
  );
}

export default Networth;
