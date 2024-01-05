import React from "react";
import { useEffect, useState } from "react";
import { getReturn } from "../api/portfolioApi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function Return(props) {
  const [portfolioReturnSeriesData, setPortfolioReturnSeriesData] = useState([]);
  const [benchmarkReturnSeriesData, setBenchmarkReturnSeriesData] = useState([]);


  useEffect(() => {
    let portfolioReturnArrData = [];
    let benchmarkReturnArrData = [];

    async function fetchData() {
      let response = await getReturn(props.userTokenObj);
      /* Set HC data format - arr([x,y],[x,y]..) */

       for (const key in response) {
          if (key === "portfolioReturn") {
            let portfolioReturnMap = response[key];
            for (const dateVal in portfolioReturnMap) {
              portfolioReturnArrData.push([
                new Date(dateVal).getTime(),
                portfolioReturnMap[dateVal],
              ]);
            }
          } else if (key === "benchmarkReturn") {
            let benchmarkReturnMap = response[key];
            for (const dateVal in benchmarkReturnMap) {
              benchmarkReturnArrData.push([
                new Date(dateVal).getTime(),
                benchmarkReturnMap[dateVal],
              ]);
            }
          }
        }

      setPortfolioReturnSeriesData(portfolioReturnArrData);
      setBenchmarkReturnSeriesData(benchmarkReturnArrData);
    }
    fetchData();
  }, [props]);

  /* Highcharts Config */
  const highChartOptions = {
    credits: {
      enabled: false,
    },
    chart: {
      zoomType: "x",
      /* Added to fit container, HC fits oly on window resize and not parent container size changes */
      events: {
        render: function () {
          this.reflow();
        },
      },
    },
    title: {
      text: "Return",
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function () {
          let selectedPointsLength =
            this.chart.series[0].xData.length - this.chart.series[0].cropStart;
          if (selectedPointsLength < 32) {
            return Highcharts.dateFormat("%d/%m/%y", this.value);
          } else {
            return Highcharts.dateFormat("%b %Y", this.value);
          }
        },
      },
    },
    series: [
      {
        name: "Portfolio Return",
        data: portfolioReturnSeriesData,
      },
      {
        name: "Benchmark Return",
        data: benchmarkReturnSeriesData,
      },
    ],
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
    },
  };

  return (
    <>
      {portfolioReturnSeriesData ? (
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

export default Return;
