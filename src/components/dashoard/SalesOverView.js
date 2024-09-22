import React from "react";
import style from "./bar.module.css";

const SalesOverView = () => {
  const data = [
    { label: "Jan", value: 30 },
    { label: "Feb", value: 20 },
    { label: "Mar", value: 40 },
    { label: "Apr", value: 25 },
    { label: "May", value: 35 },
    { label: "Jun", value: 45 },
    { label: "Jul", value: 50 },
    { label: "Aug", value: 55 },
    { label: "Sep", value: 60 },
    { label: "Oct", value: 65 },
    { label: "Nov", value: 70 },
    { label: "Dec", value: 75 },
  ];
  const maxValue = Math.max(...data.map((item) => item.value));
  return (
    <div className="w-[100%] h-[100%] flex flex-col shadow-cardShadow rounded-md p-[24px] ">
      <div>
        <h3 className="text-cardHeader font-cardHeader">Overview</h3>
        <p className="text-cardDescription font-cardDescription">
          You made 75 sales this month.
        </p>
      </div>
      <div className="pt-5 flex-1 flex flex-col gap-4">
        <div className={`${style.bar_chart}`}>
          {data.map((item) => {
            const barHeight = (item.value / maxValue) * 100;
            return (
              <div key={item.label} className={`${style.bar} h-[100%] flex`}>
                <div
                  className={`${style.bar_fill}`}
                  style={{ height: ` ${barHeight}% ` }}
                >
                  <span className={`${style.bar_label}`}>{item.value}</span>
                </div>
                <div className={`${style.bar_title}`}>{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SalesOverView;
