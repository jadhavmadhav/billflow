import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
        borderWidth: 0.5,
      },
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: [
        1000, 1500, 1800, 1500, 2004, 2500, 2006, 2450, 2500, 2085,
        2005, 2100,
      ],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.1)", 
      cubicInterpolationMode: "monotone", 
      borderWidth: 2, // Adjust the line width as needed
      pointRadius: 2
    },
  ],
};

function ProfitChart() {
  return (
    <div style={{ maxHeight: "500px" }}>
      <Line
        options={options}
        data={data}
        style={{ width: "100%", margin: "auto" }}
      />
      ;
    </div>
  );
}

export default ProfitChart;
