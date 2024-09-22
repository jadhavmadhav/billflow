import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NotificationData } from "../../data/NotificationData";
import { WiMoonAltNew } from "react-icons/wi";
import { useState } from "react";

const ViewNotification = () => {
  const [selectedNotification, setSelectedNotification] = useState({});
  const navigate = useNavigate();
  const notification_id = useParams()?.id;

  const { id, title, desc, isNew, date, time } = selectedNotification;

  useMemo(() => {
    const Result = NotificationData?.find((item) => item.id == notification_id);
    setSelectedNotification(Result);
  }, [notification_id]);

  return (
    <div className="flex justify-between h-[100%] overflow-hidden">
      <div
        style={{
          width: "calc(100% - 300px)",
        }}
      >
        <div>
          <div className="mb-5">
            <h5 className="text-[24px] font-[500]">{title}</h5>
            <p className="text-[15px] font-[500] text-[#757575]">
              {date}, {time}
            </p>
          </div>
          <p className="text-[18px] leading-[1.2] font-[400] text-[#363535]">
            {desc}
          </p>
        </div>
      </div>

      <div className=" w-[300px] overflow-auto">
        {NotificationData?.map((item) => {
          const { id, title, desc, isNew } = item;
          return (
            <div
              className="px-3 pb-2 mb-3 cursor-pointer active:scale-[1.01]  "
              style={{
                boxShadow: "rgba(17, 17, 26, 0.1) 0px 2.5px 5px",
              }}
              key={id}
              onClick={() => navigate(`/notification/${id}`)}
            >
              <div className="flex justify-between items-center">
                <h5 className="text-[16px] font-[500]">{title}</h5>
                {isNew && <WiMoonAltNew className="text-[red]" />}
              </div>
              <p className="text-[14px] leading-[1.2] font-[400] text-[#646464]">
                {desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewNotification;
