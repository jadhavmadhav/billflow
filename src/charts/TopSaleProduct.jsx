import React, { useEffect } from 'react'; 
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["HP Laptop", "Key board","mouse","Printer","RAM"],
  datasets: [
    {
      label: "# of Sales",
      data: [12, 19,10,15,5],
      backgroundColor: ["rgba(35, 199,785)", "rgba(22, 80, 12)","rgba(78, 45, 142)","rgba(100, 259, 132)","rgba(250, 829, 132)"],
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
 
};

const TopSaleProduct = () => {
    
  return (
    <div style={{ maxHeight: "400px" }}>
      <Pie
        data={data}
        options={options}
        style={{ width: "100%", margin: "auto" }}
      />
    </div>
  );
};

export default TopSaleProduct;

 
