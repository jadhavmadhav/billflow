import React, { useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../redux/features/modalStates";
import style from "../styles/Header.module.css";
import NotificationModal from "../pages/Notification/NotificationModal";
import { WiMoonAltNew } from "react-icons/wi";
import { useNavigate } from "react-router-dom";
import { getData } from "../redux/features/callAip";
import { callOverviewAPI } from "../redux/features/getOverview";

const Header = (props) => {
  const { label } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNotifictionModal = useSelector(
    (state) => state.ModalStates?.notification
  );

  const handleNotification = () => {
    if (isNotifictionModal) {
      dispatch(closeModal({ notification: false }));
    } else {
      dispatch(openModal({ notification: true }));
    }
  };

  useEffect(() => {
    dispatch(getData());
    dispatch(callOverviewAPI(localStorage.getItem("userId")));
  }, []);
  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <div className="flex justify-between items-center h-[100%] px-5">
      <div className="w-[70px] ">
        <img src={process.env.PUBLIC_URL + "/favicon.png"} />
      </div>
      <div className="flex gap-[30px] items-center">
        <div
          className="w-[40px] h-[40px] rounded-[50%] bg-brand overflow-hidden cursor-pointer active:scale-[1.05] "
          onClick={handleProfile}
        >
          <img src="https://media.licdn.com/dms/image/D4D03AQE_1K3Pujni5w/profile-displayphoto-shrink_200_200/0/1719976405647?e=2147483647&v=beta&t=hyCZ30eunjFK2V-I2IoiAtzQKXAzBR5YP6tbirrXZ68" />
        </div>
      </div>
    </div>
  );
};

export default Header;
