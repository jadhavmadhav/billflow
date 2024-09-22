import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
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
      label: "Dataset 1",
      data: [14000, 20500, 12000, 10800, 10045, 25800, 29006, 10450, 19500, 10085, 18005, 19000],
      backgroundColor: "#46B0DD",
      //   barThickness: 50, // Adjust the bar thickness as needed
      maxBarThickness: 50,
      borderRadius: 4, // Set the border radius for rounded bars
    },
  ],
};

function Sales() {
  return (
    <div style={{ maxHeight: "500px" }}>
      <Bar
        options={options}
        data={data}
        style={{ width: "100%", margin: "auto" }}
      />
      ;
    </div>
  );
}

export default Sales;
