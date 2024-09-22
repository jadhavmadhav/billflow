import React from "react";
import DateRange from "./DateRange";

const CardHeader = (props) => {
  const { title, dateRange,color } = props; 
  return (
    <div>
      <div className={`bg-[${color?color:"#d9d9d95b"}] py-[10px] px-[25px] flex justify-between items-center`}>
        <div>
          <h6 className="text-[25px] font-[600]">{title}</h6>
        </div>

        {dateRange ? <DateRange /> : ""}
      </div>
    </div>
  );
};

export default CardHeader;
