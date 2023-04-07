import { Box } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

function ColumnChart() {
  const data = {
    series: [
      {
        name: "Amount Received",
        data: [
          44000, 35000, 57000, 56000, 61000, 78000, 63000, 60000, 66000, 63000,
          60000, 66000,
        ],
      },
      // {
      //   name: "Revenue",
      //   data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      // },
      // {
      //   name: "Free Cash Flow",
      //   data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      // },
    ],
    options: {
      // colors:['#F44336', '#E91E63', '#9C27B0'],
      chart: {
        type: "bar",
        height: 350,
      },
      // colors: [
      //   "#F44336",
      //   "#E91E63",
      //   "#9C27B0",
      //   "#673AB7",
      //   "#3F51B5",
      //   "#2196F3",
      //   "#03A9F4",
      //   "#00BCD4",
      //   "#009688",
      //   "#4CAF50",
      //   "#8BC34A",
      //   "#CDDC39",
      // "#FFEB3B",
      // "#FFC107",
      // "#FF9800",
      // "#FF5722",
      // "#795548",
      // "#9E9E9E",
      // "#607D8B",
      // ],

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        title: {
          text: "Raised Amount (PKR)",
        },
      },
      fill: {
        // type: "gradient",
        // colors: ["#00E396"],
        // opacity: 1,
        // colors: ["#0F0", "#F00"],
        // colors: [
        //   "#F44336",
        //   "#E91E63",
        //   "#9C27B0",
        //   "#673AB7",
        //   "#3F51B5",
        //   "#2196F3",
        //   "#03A9F4",
        //   "#00BCD4",
        //   "#009688",
        //   "#4CAF50",
        //   "#8BC34A",
        //   "#CDDC39",
        // ],
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return "PKR " + val;
          },
        },
      },
    },
  };

  return (
    <Box>
      <ReactApexChart
        options={data.options}
        series={data.series}
        type="bar"
        height={350}
      />
    </Box>
  );
}

export default ColumnChart;
