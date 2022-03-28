import { React, useEffect } from "react";
import { getModelPortfolio } from "../api/portfolioApi";

function ModelPortfolioPage(props) {
  async function fetchModelPortfolio() {
    let response = await getModelPortfolio(props.userTokenObj);
    console.log("Model Pf - " + response.Securities);
  }

  useEffect(() => {
    fetchModelPortfolio();
  }, []);

  return <>Model Portfolio Page</>;
}

export default ModelPortfolioPage;
