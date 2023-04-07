import { Box } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

function PieChart() {
  let data = {
    series: [100, 1000 - 100],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      colors: ["#00c853", "#e57373"],
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        },
        position: "bottom",
        verticalAlign: "bottom",
      },
      labels: ["Received Amount", "Remaining Amount"],
    },
  };

  return (
    <>
      <Box>
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="donut"
          height={350}
        />
      </Box>
    </>
  );
}

export default PieChart;
