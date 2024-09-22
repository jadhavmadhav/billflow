import React from "react";
import { WiMoonAltNew } from "react-icons/wi";
import { NotificationData } from "../../data/NotificationData";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/features/modalStates";
import { useNavigate } from "react-router-dom";

const NotificationModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(closeModal({ notification: false }));
  };

  const handleNotification = (id) => {
    handleClose();
    navigate(`/notification/${id}`);
  };
  return (
    <div className="py-3 ">
      <div className="flex justify-end px-3">
        <AiOutlineCloseCircle
          className="text-[24px] cursor-pointer"
          onClick={handleClose}
        />
      </div>
      {NotificationData?.map((item) => {
        const { id, title, desc, isNew } = item;
        return (
          <div
            className="px-3 pb-2 mb-3 cursor-pointer active:scale-[1.01]  "
            style={{
              boxShadow: "rgba(17, 17, 26, 0.1) 0px 2.5px 5px",
            }}
            key={id}
            onClick={() => handleNotification(id)}
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
  );
};

export default NotificationModal;
