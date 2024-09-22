import React, { useEffect } from "react";
import { LuUsers } from "react-icons/lu";
import { SlCreditCard } from "react-icons/sl";
import { MdOutlineStackedLineChart } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { callOverviewAPI } from "../../redux/features/getOverview";

const testData = [
  {
    title: "Total Revenue",
    value: "45,231.89 ",
    description: "+20.1% from last month",
    Icon: MdCurrencyRupee,
  },
  {
    title: "Subscriptions",
    value: " +2350",
    description: "+180.1% from last month",
    Icon: LuUsers,
  },
  {
    title: "Sales",
    value: " +12,234 ",
    description: "+19% from last month",
    Icon: SlCreditCard,
  },
  {
    title: "Active Now",
    value: "+573",
    description: "+201 since last hour  ",
    Icon: MdOutlineStackedLineChart,
  },
];
const Overview = () => {
  const dispatch = useDispatch();

  const Data = useSelector((state) => state.getOverviewData);

  console.log("Data", Data);
  useEffect(() => {
    dispatch(callOverviewAPI(localStorage.getItem("userId")));
  }, []);
  return (
    <div className="w-[100%] flex justify-between">
      {testData?.map((item) => {
        const { title, value, description, Icon } = item;
        return (
          <div className="h-[100%] w-[20%] shadow-cardShadow p-[20px] flex flex-col gap-3 rounded-md ">
            <div className="flex justify-between items-center  ">
              <h1 className="text-cardHeader font-cardHeader">{title}</h1>
              <h1 className="font-[500] ">
                <Icon />
              </h1>
            </div>
            <div>
              <h1 className="font-[800] text-[30px] ">{value}</h1>
              <p className="text-cardDescription font-cardDescription ">
                {description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Overview;
