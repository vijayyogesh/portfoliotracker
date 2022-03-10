import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { getNetworth } from "../api/portfolioApi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Networth(props) {
  const [networthSeriesData, setNetworthSeriesData] = useState([]);
  const [equitySeriesData, setEquitySeriesData] = useState([]);
  const [debtSeriesData, setDebtSeriesData] = useState([]);

  useEffect(() => {
    let networthArrData = [];
    let equityArrData = [];
    let debtArrData = [];

    async function fetchData() {
      let response = await getNetworth(props.userTokenObj);
      /* Set HC data format - arr([x,y],[x,y]..) */
      for (const key in response) {
        if (key === "networth") {
          let networthMap = response[key];
          for (const dateVal in networthMap) {
            networthArrData.push([
              new Date(dateVal).getTime(),
              networthMap[dateVal],
            ]);
          }
        } else if (key === "equity") {
          let equityMap = response[key];
          for (const dateVal in equityMap) {
            equityArrData.push([
              new Date(dateVal).getTime(),
              equityMap[dateVal],
            ]);
          }
        } else if (key === "debt") {
          let debtMap = response[key];
          for (const dateVal in debtMap) {
            debtArrData.push([new Date(dateVal).getTime(), debtMap[dateVal]]);
          }
        }
      }
      setNetworthSeriesData(networthArrData);
      setEquitySeriesData(equityArrData);
      setDebtSeriesData(debtArrData);
    }
    fetchData();
  }, [props]);

  /* Highcharts Config */
  const highChartOptions = {
    chart: {
      zoomType: "x",
    },
    title: {
      text: "My Networth",
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%b %Y}", // Jan 2021
      },
    },
    series: [
      {
        name: "Networth",
        data: networthSeriesData,
      },
      {
        name: "Equity",
        data: equitySeriesData,
      },
      {
        name: "Debt",
        data: debtSeriesData,
      },
    ],
  };

  return (
    <>
      {networthSeriesData ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={highChartOptions}
        ></HighchartsReact>
      ) : (
        <p>No data available</p>
      )}
    </>
  );
}

export default Networth;
