import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import { getNetworth } from "../api/portfolioApi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Networth(props) {
  const [chartCategoriesData, setChartCategoriesData] = useState([]);
  const [chartSeriesData, setChartSeriesData] = useState([]);

  useEffect(() => {
    let xData = [];
    let yData = [];

    async function fetchData() {
      let response = await getNetworth(props.userTokenObj);
      for (const key in response) {
        xData.push(key);
        yData.push(response[key]);
      }
      setChartCategoriesData(xData);
      setChartSeriesData(yData);
    }

    fetchData();
  }, [props]);

  const highChartOptions = {
    title: {
      text: "My Networth",
    },
    xAxis: {
      type: "dateTime",
      categories: chartCategoriesData,
      labels: {
        format: "{value:%Y-%b}",
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
      <div>Networth Page</div>
      {chartCategoriesData ? (
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
