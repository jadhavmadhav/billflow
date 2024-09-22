import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
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
  Legend
);

export const options = {
  // responsive: true,
  plugins: {
    legend: {
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
      },
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sap",
  "Nov",
  "Des",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [10, 40, 48, 32, 20, 12, 14, 54, 10, 25, 14, 2],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      pointRadius: 2,
      borderWidth: 2,
      tension: 0.3,
      borderColor: "#7CAAFC",
    },
  ],
};

export default function SalesChart() {
  return <Line options={options} data={data} height={"50px"} />;
}
