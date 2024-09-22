import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Available", "Sale"],
  datasets: [
    {
      label: "# of stock",
      data: [12, 19],
      backgroundColor: ["rgba(255, 99, 132)", "rgba(25, 89, 132)"],
      borderWidth: 0, // Set border width to 0 to remove the border
    },
  ],
};

const options = {
  plugins: {
    legend: {
      position: "right", // Place legend on the right side
    },
  },

  cutout: "60%", // Set the cutout percentage to 80% to reduce the stroke width
};

const ProductStockChart = () => {
  // useEffect(() => {
  //   ChartJS.register({
  //     id: "doughnutLabel",
  //     beforeDraw: (chart) => {
  //       const { ctx, chartArea } = chart;
  //       ctx.save();
  //       ctx.font = "30px Arial";
  //       ctx.textAlign = "center";
  //       ctx.textBaseline = "middle";
  //       const total = data.datasets[0].data.reduce(
  //         (acc, curr) => acc + curr,
  //         0
  //       );
  //       const text = `${total}`;
  //       const textX = Math.round((chartArea.left + chartArea.right) / 2);
  //       const textY = Math.round((chartArea.top + chartArea.bottom) / 2);
  //       ctx.fillText(text, textX, textY);
  //       ctx.restore();
  //     },
  //   });
  // }, []);
  return (
    <div style={{ maxHeight: "400px" }}>
      <Doughnut
        data={data}
        options={options}
        style={{ width: "100%", margin: "auto" }}
      />
    </div>
  );
};

export default ProductStockChart;
