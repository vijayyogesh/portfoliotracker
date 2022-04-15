import React from "react";
import { useEffect, useState } from "react";
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
      text: "My Networth",
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
