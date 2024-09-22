import React from "react";
import DateRange from "../../components/DateRange";
import CardHeader from "../../components/cardHeader";
import { Line } from "react-chartjs-2";
import SalesChart from "../../components/sales";
import { useState } from "react";
import CustomerCard from "../../components/customerCard";
import testData from "../../data/customerData";

 

const Dashboard = () => {
  const Data = [
    {
      name: "Total Sales",
      diff: "+5%  incoming",
      amount: "20244",
    },
    {
      name: "Product's",
      diff: "+10%  incoming",
      amount: "432",
    },
    {
      name: "Revenue",
      diff: "+8%  incoming",
      amount: "18870",
    },
    {
      name: "Gross Profit",
      diff: "+6%  incoming",
      amount: "15000",
    },
    {
      name: "Net Profit",
      diff: "+5%  incoming",
      amount: "1400",
    },
  ];
  let chartData = [10, 12, 11, 9, 14, 14];
  return (
    <div className="flex flex-col gap-10">
      <div className="rounded-[10px] overflow-hidden shadow-cardShadow">
        <CardHeader title="Overview" dateRange />
        <div className="p-[20px] flex gap-[25px] justify-around ">
          {Data?.map((item) => {
            const { name, diff, amount } = item;
            return (
              <div className="p-[20px] rounded-[6px] w-[100%] border border-[#0000001A] flex flex-col gap-1 items-center bg-gradient-to-b from-red-500 to-yellow-500 chart-item">
                <h6 className="text-[20px] font-[600]">{name}</h6>
                <p className="text-[#767575] text-[13px] font-[600]">{diff}</p>
                <h6 className="text-[24px] font-[600]">{amount}</h6>
              </div>
            );
          })}
        </div>
      </div>
      <div className="rounded-[10px] overflow-hidden shadow-cardShadow">
        <CardHeader title="Sales" dateRange />
        <div className="p-[20px] flex gap-[25px] justify-around   w-[100%] ">
          <SalesChart />
        </div>
      </div>
      <div className="rounded-[10px] overflow-hidden shadow-cardShadow">
        <CardHeader title="Top Payed Customer's" dateRange />
        <div className="p-[20px] flex flex-col gap-[25px]">
          {testData?.map((item) => (
            <CustomerCard data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
