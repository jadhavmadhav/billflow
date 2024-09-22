import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  PieChart,
  Pie,
  Area,
  Cell,
  ResponsiveContainer,
} from "recharts";

// import React from "react";
// import Overview from "../../components/dashoard/Overview";
// import SalesOverView from "../../components/dashoard/SalesOverView";
// import ResentSales from "../../components/dashoard/ResentSales";
// import PageLayout from "../../layout/PageLayout";

// export const Dashboard = () => {
//   return (
//     <PageLayout label={"Dashboard"}>
//       <div className="h-[100%] flex flex-col gap-10 pt-5">
//         <div>
//           <Overview />
//         </div>
//         <div className="flex gap-5 h-[550px] overflow-hidden ">
//           <div className=" w-[60%] h-[100%] ">
//             <SalesOverView />
//           </div>
//           <div className="flex-1">
//             <ResentSales />
//           </div>
//         </div>
//       </div>
//     </PageLayout>
//   );
// };

// -----------------------------------------------------------------------------------------------------------------------------------------

// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Container,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
//   AreaChart,
//   Area,
//   PieChart,
//   Pie,
// } from "recharts";

// Sample Data with 12 months
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4000 },
  { name: "May", sales: 4500 },
  { name: "Jun", sales: 5000 },
  { name: "Jul", sales: 6000 },
  { name: "Aug", sales: 7000 },
  { name: "Sep", sales: 6500 },
  { name: "Oct", sales: 5000 },
  { name: "Nov", sales: 5500 },
  { name: "Dec", sales: 6000 },
];

const revenueData = [
  { name: "Jan", revenue: 2400 },
  { name: "Feb", revenue: 2210 },
  { name: "Mar", revenue: 2290 },
  { name: "Apr", revenue: 2000 },
  { name: "May", revenue: 2180 },
  { name: "Jun", revenue: 2500 },
  { name: "Jul", revenue: 2700 },
  { name: "Aug", revenue: 2800 },
  { name: "Sep", revenue: 2700 },
  { name: "Oct", revenue: 2500 },
  { name: "Nov", revenue: 2400 },
  { name: "Dec", revenue: 2600 },
];

const profitData = [
  { name: "Jan", profit: 4000 },
  { name: "Feb", profit: 3000 },
  { name: "Mar", profit: 4500 },
  { name: "Apr", profit: 3500 },
  { name: "May", profit: 4000 },
  { name: "Jun", profit: 4200 },
  { name: "Jul", profit: 4700 },
  { name: "Aug", profit: 4900 },
  { name: "Sep", profit: 4600 },
  { name: "Oct", profit: 4300 },
  { name: "Nov", profit: 4500 },
  { name: "Dec", profit: 4700 },
];

const netProfitData = [{ name: "Net Profit", value: 10000 }];

const billData = [
  { name: "Jan", bill: 1200 },
  { name: "Feb", bill: 1300 },
  { name: "Mar", bill: 1400 },
  { name: "Apr", bill: 1100 },
  { name: "May", bill: 1500 },
  { name: "Jun", bill: 1600 },
  { name: "Jul", bill: 1700 },
  { name: "Aug", bill: 1800 },
  { name: "Sep", bill: 1900 },
  { name: "Oct", bill: 2000 },
  { name: "Nov", bill: 2100 },
  { name: "Dec", bill: 2200 },
];

// export const Dashboard = () => {
//   const [salesChartType, setSalesChartType] = useState("line");
//   const [revenueChartType, setRevenueChartType] = useState("line");
//   const [profitChartType, setProfitChartType] = useState("line");
//   const [billChartType, setBillChartType] = useState("line");

//   const chartWidth = window.innerWidth < 600 ? 300 : 500;
//   const chartHeight = 250;

//   const renderChart = (data, chartType) => {
//     switch (chartType) {
//       case "bar":
//         return (
//           <BarChart width={700} height={300} data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey={Object.keys(data[0])[1]} fill="#8884d8" />
//           </BarChart>
//         );
//       case "area":
//         return (
//           <AreaChart width={700} height={300} data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Area
//               type="monotone"
//               dataKey={Object.keys(data[0])[1]}
//               stroke="#8884d8"
//               fill="#8884d8"
//             />
//           </AreaChart>
//         );
//       case "line":
//       default:
//         return (
//           <LineChart width={700} height={300} data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey={Object.keys(data[0])[1]}
//               stroke="#8884d8"
//             />
//           </LineChart>
//         );
//     }
//   };

//   return (
//     <Grid container spacing={4} className=" p-5">
//       {/* Sales */}
//       <Grid item xs={12} md={6} lg={6}>
//         <div className="shadow-cardShadow rounded-[10px]">
//           <div>
//             <div className="p-3  flex justify-between items-center border-b">
//               <Typography variant="h6" style={{ color: "#007bff" }}>
//                 Sales
//               </Typography>
//               <Select
//                 value={salesChartType}
//                 onChange={(e) => setSalesChartType(e.target.value)}
//                 size="small"
//               >
//                 <MenuItem value="line">Line Chart</MenuItem>
//                 <MenuItem value="bar">Bar Chart</MenuItem>
//                 <MenuItem value="area">Area Chart</MenuItem>
//               </Select>
//             </div>
//             <div className="p-3 py-5">
//               {renderChart(salesData, salesChartType)}
//             </div>
//           </div>
//         </div>
//       </Grid>

//       {/* Revenue */}
//       <Grid item xs={12} md={6} lg={6}>
//         <div className="shadow-cardShadow rounded-[10px]">
//           <div>
//             <div className="p-3  flex justify-between items-center border-b">
//               <Typography variant="h6" style={{ color: "#007bff" }}>
//                 Revenue
//               </Typography>
//               <Select
//                 value={revenueChartType}
//                 onChange={(e) => setRevenueChartType(e.target.value)}
//                 size="small"
//               >
//                 <MenuItem value="line">Line Chart</MenuItem>
//                 <MenuItem value="bar">Bar Chart</MenuItem>
//                 <MenuItem value="area">Area Chart</MenuItem>
//               </Select>
//             </div>
//             <div className="p-3 py-5">
//               {renderChart(revenueData, revenueChartType)}
//             </div>
//           </div>
//         </div>
//       </Grid>

//       {/* Profit */}
//       <Grid item xs={12} md={6} lg={6}>
//         <div className="shadow-cardShadow rounded-[10px]">
//           <div>
//             <div className="p-3  flex justify-between items-center border-b">
//               <Typography variant="h6" style={{ color: "#007bff" }}>
//                 Profit
//               </Typography>
//               <Select
//                 value={profitChartType}
//                 onChange={(e) => setProfitChartType(e.target.value)}
//                 size="small"
//               >
//                 <MenuItem value="line">Line Chart</MenuItem>
//                 <MenuItem value="bar">Bar Chart</MenuItem>
//                 <MenuItem value="area">Area Chart</MenuItem>
//               </Select>
//             </div>
//             <div className="p-3 py-5">
//               <LineChart width={700} height={300} data={profitData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="profit" stroke="#8884d8" />
//               </LineChart>
//             </div>
//           </div>
//         </div>
//       </Grid>

//       {/* Bill Chart */}
//       <Grid item xs={12} md={6} lg={6}>
//         <div className="shadow-cardShadow rounded-[10px]">
//           <div>
//             <div className="p-3  flex justify-between items-center border-b">
//               <Typography variant="h6" style={{ color: "#007bff" }}>
//                 Bills
//               </Typography>
//               <Select
//                 value={billChartType}
//                 onChange={(e) => setBillChartType(e.target.value)}
//                 size="small"
//               >
//                 <MenuItem value="line">Line Chart</MenuItem>
//                 <MenuItem value="bar">Bar Chart</MenuItem>
//                 <MenuItem value="area">Area Chart</MenuItem>
//               </Select>
//             </div>
//             <div className="p-3 py-5">
//               {renderChart(billData, billChartType)}
//             </div>
//           </div>
//         </div>
//       </Grid>

//       {/* Top Sales Products */}
//       <Grid item xs={12} md={6} lg={6}>
//         <div className="shadow-cardShadow rounded-[10px]">
//           <div>
//             <Typography
//               variant="h6"
//               className=" border-b p-3"
//               style={{ color: "#007bff" }}
//             >
//               Top Sales Products
//             </Typography>
//             <div style={{ overflowX: "auto p-3 py-5" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr>
//                     <th
//                       style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
//                     >
//                       Product
//                     </th>
//                     <th
//                       style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
//                     >
//                       Sales
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Sample Data */}
//                   <tr>
//                     <td
//                       style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
//                     >
//                       Product A
//                     </td>
//                     <td
//                       style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
//                     >
//                       $5,000
//                     </td>
//                   </tr>
//                   <tr>
//                     <td
//                       style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
//                     >
//                       Product B
//                     </td>
//                     <td
//                       style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
//                     >
//                       $3,500
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </Grid>

//       {/* Top Billing Customers */}
//       <Grid item xs={12} md={6} lg={6}>
//         <div className="shadow-cardShadow rounded-[10px]">
//           <div>
//             <Typography
//               variant="h6"
//               className=" border-b p-3"
//               style={{ color: "#007bff" }}
//             >
//               Top Billing Customers
//             </Typography>
//             <div style={{ overflowX: "auto p-3 py-5" }}>
//               <table style={{ width: "100%", borderCollapse: "collapse" }}>
//                 <thead>
//                   <tr>
//                     <th
//                       style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
//                     >
//                       Customer
//                     </th>
//                     <th
//                       style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
//                     >
//                       Amount
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {/* Sample Data */}
//                   <tr>
//                     <td
//                       style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
//                     >
//                       Customer A
//                     </td>
//                     <td
//                       style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
//                     >
//                       $7,500
//                     </td>
//                   </tr>
//                   <tr>
//                     <td
//                       style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
//                     >
//                       Customer B
//                     </td>
//                     <td
//                       style={{ borderBottom: "1px solid #ddd", padding: "8px" }}
//                     >
//                       $4,200
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </Grid>
//     </Grid>
//   );
// };

// ---------------------------------------------------------------------------------------------------------------------------------------------

// Sample Data with 12 months

// Function to generate random colors
const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}`}
    </text>
  );
};

export const Dashboard = () => {
  const [salesChartType, setSalesChartType] = useState("bar");
  const [revenueChartType, setRevenueChartType] = useState("bar");
  const [billChartType, setBillChartType] = useState("bar");

  const renderChart = (data, chartType) => {
    const dataKey = Object.keys(data[0])[1];
    const color = generateRandomColor(); // Generate random color

    switch (chartType) {
      case "bar":
        return (
          <BarChart width={700} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill={color} />
          </BarChart>
        );
      case "area":
        return (
          <AreaChart width={700} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fill={color}
            />
          </AreaChart>
        );
      default:
        return null;
    }
  };

  // Calculate overview data
  const totalSales = salesData.reduce((acc, cur) => acc + cur.sales, 0);
  const totalRevenue = revenueData.reduce((acc, cur) => acc + cur.revenue, 0);
  const totalProfit = profitData.reduce((acc, cur) => acc + cur.profit, 0);
  const totalBills = billData.reduce((acc, cur) => acc + cur.bill, 0);

  return (
    <div className=" p-5">
      {/* Overview Section */}
      <Grid container spacing={4} style={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={6} md={3}>
          <div className="shadow-cardShadow rounded-[10px] p-3 px-8" >
            <Typography variant="h6" style={{ color: "#007bff" }}>
              Total Sales
            </Typography>
            <Typography variant="h4">${totalSales}</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className="shadow-cardShadow rounded-[10px] p-3 px-8">
            <Typography variant="h6" style={{ color: "#007bff" }}>
              Total Revenue
            </Typography>
            <Typography variant="h4">${totalRevenue}</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className="shadow-cardShadow rounded-[10px] p-3 px-8">
            <Typography variant="h6" style={{ color: "#007bff" }}>
              Total Profit
            </Typography>
            <Typography variant="h4">${totalProfit}</Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className="shadow-cardShadow rounded-[10px] p-3 px-8">
            <Typography variant="h6" style={{ color: "#007bff" }}>
              Total Bills
            </Typography>
            <Typography variant="h4">${totalBills}</Typography>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Sales */}
        <Grid item xs={12} md={6}>
          <div className="shadow-cardShadow rounded-[10px]">
            <div>
              <div className="p-3 h-[70px] flex justify-between items-center border-b border-[#a7a7a7]">
                <Typography variant="h6" style={{ color: "#007bff" }}>
                  Sales
                </Typography>
                <Select
                  value={salesChartType}
                  onChange={(e) => setSalesChartType(e.target.value)}
                  size="small"
                >
                  <MenuItem value="bar">Bar Chart</MenuItem>
                  <MenuItem value="area">Area Chart</MenuItem>
                </Select>
              </div>
              <div className="p-3 py-5 overflow-auto">
                {renderChart(salesData, salesChartType)}
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div className="shadow-cardShadow rounded-[10px]">
            <div>
              <div className="p-3 h-[70px] flex justify-between items-center border-b border-[#a7a7a7]">
                <Typography variant="h6" style={{ color: "#007bff" }}>
                  Sales Products Distribution
                </Typography>
              </div>
              <div className="p-3 py-5 overflow-auto">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={salesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="sales"
                    >
                      {salesData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={generateRandomColor()}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Grid>

        {/* Revenue */}
        <Grid item xs={12} md={6} lg={6}>
          <div className="shadow-cardShadow rounded-[10px]">
            <div>
              <div className="p-3 h-[70px] flex justify-between items-center border-b border-[#a7a7a7]">
                <Typography variant="h6" style={{ color: "#007bff" }}>
                  Revenue
                </Typography>
                <Select
                  value={revenueChartType}
                  onChange={(e) => setRevenueChartType(e.target.value)}
                  size="small"
                >
                  <MenuItem value="bar">Bar Chart</MenuItem>
                  <MenuItem value="area">Area Chart</MenuItem>
                </Select>
              </div>
              <div className="p-3 py-5 overflow-auto">
                {renderChart(revenueData, revenueChartType)}
              </div>
            </div>
          </div>
        </Grid>

        {/* Profit */}
        <Grid item xs={12} md={6}>
          <div className="shadow-cardShadow rounded-[10px]">
            <div>
              <div className="p-3 h-[70px] flex justify-between items-center border-b border-[#a7a7a7]">
                <Typography variant="h6" style={{ color: "#007bff" }}>
                  Profit
                </Typography>
                <Select
                  value={billChartType}
                  onChange={(e) => setBillChartType(e.target.value)}
                  size="small"
                >
                  <MenuItem value="bar">Bar Chart</MenuItem>
                  <MenuItem value="area">Area Chart</MenuItem>
                </Select>
              </div>
              <div className="p-3 py-5 overflow-auto">
                {renderChart(profitData, billChartType)}
              </div>
            </div>
          </div>
        </Grid>

        {/* Bills */}
        <Grid item xs={12} md={6}>
          <div className="shadow-cardShadow rounded-[10px]">
            <div>
              <div className="p-3 h-[70px] flex justify-between items-center border-b border-[#a7a7a7]">
                <Typography variant="h6" style={{ color: "#007bff" }}>
                  Bills
                </Typography>
                <Select
                  value={billChartType}
                  onChange={(e) => setBillChartType(e.target.value)}
                  size="small"
                >
                  <MenuItem value="bar">Bar Chart</MenuItem>
                  <MenuItem value="area">Area Chart</MenuItem>
                </Select>
              </div>
              <div className="p-3 py-5 overflow-auto">
                {renderChart(billData, billChartType)}
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
