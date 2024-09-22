import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideMenu from "../pages/sideMenu/SideMenu";
import Header from "../components/Header";
import style from "./mainLayout.module.css";
import { getEnterpriseDetails } from "../services/autho";
import { enterPriseDetails } from "../redux/features/enterpriseDetails";
import { useDispatch } from "react-redux";

export const SideMenuWidth = "250px";

const MainLayout = () => {
  let isLogin = JSON.parse(localStorage.getItem("isLogin"));

  const dispatch = useDispatch();
  const CallEnterpriseDetails = async () => {
    try {
      const response = await getEnterpriseDetails();
      if (response.status == 200) {
        dispatch(enterPriseDetails(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CallEnterpriseDetails();
  });

  if (isLogin == true) {
    return (
      <div
        className={style.main_container}
        style={{ gridTemplateColumns: `${SideMenuWidth} 1fr` }}
      >
        <div className={`${style.header}`}>
          <Header />
        </div>
        <div className={`${style.side_bar} bg-sideMenuColor`}>
          <SideMenu />
        </div>
        <div className={style.main_content}>
          <Outlet />
        </div>
      </div>
    );
  } else {
    return <Navigate replace={true} to="/login" />;
  }
};

export default MainLayout;
