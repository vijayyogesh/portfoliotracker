import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { getNetworth } from "../api/portfolioApi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Networth(props) {
  const [chartSeriesData, setChartSeriesData] = useState([]);

  useEffect(() => {
    let arrData = [];

    async function fetchData() {
      let response = await getNetworth(props.userTokenObj);
      /* Set HC data format - arr([],[]..) */
      for (const key in response) {
        arrData.push([new Date(key).getTime(), response[key]]);
      }
      setChartSeriesData(arrData);
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
        data: chartSeriesData,
      },
    ],
  };

  return (
    <>
      {chartSeriesData ? (
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
