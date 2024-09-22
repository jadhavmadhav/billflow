import React, { useEffect, useState } from "react";
import DropDownField from "../../forms/DropDownField";
import TextField_Render from "../../forms/TextField";
import { profileForm } from "../../forms/profile";
import imageIcon from "../../assets/image_icon.png";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [logoImage, setLogoImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

const navigate=  useNavigate()

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 576) {
      setIsMobileDevice(true);
    }
  }, []);
  return (
    <div className={`${isMobileDevice ? "px-[16px]" : "px-20"} bg-[white]`}>
      <div
        className={`${
          isMobileDevice ? "py-1" : "py-10"
        } flex flex-col justify-center items-center`}
      >
        <div className={`${isMobileDevice ? "w-[70px]" : "w-[120px]"}`}>
          <img src={process.env.PUBLIC_URL + "assets/jmb.png"} className="w" />
        </div>
        <h5
          className={`${
            isMobileDevice ? "text-[16px]" : "text-[25px]"
          } font-[500]  `}
        >
          Registration Form
        </h5>
        <p
          className={`${
            isMobileDevice ? "text-[10px] mb-2" : "text-[14px]"
          } text-[#fff9f9] `}
        >
          fill form and grow with us.
        </p>
      </div>

      <div
        className={`${
          isMobileDevice ? "p-3 py-5" : "p-10"
        } rounded-[10px] shadow-customerCardShadow`}
      >
        <div
          className={`flex-1 grid    ${
            isMobileDevice ? "grid-cols-1 gap-3" : "grid-cols-2 gap-10"
          }`}
        >
          {profileForm?.map((item) => {
            const { id, name, type, label, required, options, isMask } = item;
            switch (type) {
              case "textField":
                return (
                  <TextField_Render
                    name={name}
                    type={type}
                    label={label}
                    required={required ? true : false}
                    isMask={isMask ? true : false}
                  />
                );

              case "dropDown":
                return (
                  <DropDownField
                    name={name}
                    type={type}
                    label={label}
                    required={required ? true : false}
                    option={options}
                    setSelectedValue={setSelectedValue}
                    selectedValue={selectedValue}
                  />
                );
            }
          })}
        </div>

        <div className="flex-1 grid grid-cols-2 mt-10 gap-10">
          <div
            className={`rounded-[10px] shadow-cardShadow  active:scale-[1.1] 
                      flex flex-col   overflow-hidden relative ${
                        isMobileDevice
                          ? "w-[100%] py-2 px-1 gap-2"
                          : "w-[300px] py-5 px-10 gap-5"
                      }`}
          >
            {logoImage ? (
              <>
                <div className="flex justify-center ">
                  <img
                    src={logoImage}
                    className={`${isMobileDevice ? "w-[80px]" : "w-[100px]"}`}
                  />
                </div>
                <input
                  type="file"
                  className="absolute cursor-pointer left-0 h-[100%] w-[100%] mt-[-50px]"
                  onChange={handleLogoChange}
                />
              </>
            ) : (
              <>
                <div className="flex justify-center ">
                  <img
                    src={imageIcon}
                    className={`${isMobileDevice ? "w-[40px]" : "w-[60px]"}`}
                  />
                </div>
                <h6
                  className={`${
                    isMobileDevice
                      ? "text-[12px] font-[400]"
                      : "text-[16px] font-[500]"
                  } text-center `}
                >
                  Upload Organization Logo
                </h6>
                <input
                  type="file"
                  className="absolute cursor-pointer left-0 h-[100%] w-[100%] mt-[-50px]"
                  onChange={handleLogoChange}
                />
              </>
            )}
          </div>
          <div
            className={`rounded-[10px] shadow-cardShadow  active:scale-[1.1] 
                      flex flex-col gap-5  overflow-hidden relative ${
                        isMobileDevice
                          ? "w-[100%] py-2 px-1"
                          : "w-[300px] py-5 px-10"
                      }`}
          >
            {profileImage ? (
              <>
                <div className="flex justify-center ">
                  <img
                    src={profileImage}
                    className={`${isMobileDevice ? "w-[80px]" : "w-[100px]"}`}
                  />
                </div>
                <input
                  type="file"
                  className="absolute cursor-pointer left-0 h-[100%] w-[100%] mt-[-50px]"
                  onChange={handleProfileImageChange}
                />
              </>
            ) : (
              <>
                <div className="flex justify-center ">
                  <img
                    src={imageIcon}
                    className={`${isMobileDevice ? "w-[40px]" : "w-[60px]"}`}
                  />
                </div>
                <h6
                  className={`${
                    isMobileDevice
                      ? "text-[12px] font-[400]"
                      : "text-[16px] font-[500]"
                  } text-center `}
                >
                  Upload Owner Profile Image
                </h6>
                <input
                  type="file"
                  className="absolute cursor-pointer left-0 h-[100%] w-[100%] mt-[-50px]"
                  onChange={handleProfileImageChange}
                />
              </>
            )}
          </div>
        </div>
        <div
          className={`flex   ${
            isMobileDevice
              ? "gap-[10px] mt-5 justify-center"
              : " gap-[50px] mt-10 justify-end"
          } `}
        >
          <h4
            className={`bg-[white]    rounded-[6px] shadow-customerCardShadow cursor-pointer active:scale-[1.03] ${
              isMobileDevice
                ? "text-[18px] font-[500] px-[35px] py-[5px]"
                : "text-[24px] font-[500] py-[5px] px-[35px]"
            }`}
            onClick={()=>{navigate('/login')}}
          >
            Cancel
          </h4>
          <h4
            className={` bg-brand rounded-[6px] shadow-customerCardShadow cursor-pointer active:scale-[1.03] ${
              isMobileDevice
                ? "px-[35px] py-[5px] text-[18px] font-[500] "
                : "px-[35px] py-[5px] text-[24px] font-[500] "
            }`}
          >
            Register
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Registration;
