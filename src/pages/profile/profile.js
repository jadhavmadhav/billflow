import React, { useState } from "react";
import { TextField } from "@mui/material";
import { profileForm } from "../../forms/profile";
import TextField_Render from "../../forms/TextField";
import DropDownField from "../../forms/DropDownField";
import imageIcon from "../../assets/image_icon.png";

const Profile = () => {
  const [selectedValue, setSelectedValue] = useState();
  const [logoImage, setLogoImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

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

  return (
    <div>
      <div className=" flex-1 flex flex-col gap-[25px] overflow-scroll shadow-cardShadow rounded-[10px] p-9">
        <div className="flex-1 grid grid-cols-2 gap-10">
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
        <div className="flex-1 mt-10 grid grid-cols-2 gap-10">
          <div
            className="rounded-[10px] shadow-cardShadow w-[300px] active:scale-[1.1] 
                      flex flex-col gap-5 py-5 px-10 overflow-hidden relative"
          >
            {logoImage ? (
              <>
                <div className="flex justify-center ">
                  <img src={logoImage} className=" w-[100px]" />
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
                  <img src={imageIcon} className=" w-[60px]" />
                </div>
                <h6 className="text-[16px] text-center font-[500]">
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
            className="rounded-[10px] shadow-cardShadow w-[300px] active:scale-[1.1] 
                      flex flex-col gap-5 py-5 px-10 overflow-hidden relative"
          >
            {profileImage ? (
              <>
                <div className="flex justify-center ">
                  <img src={profileImage} className=" w-[100px]" />
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
                  <img src={imageIcon} className=" w-[60px]" />
                </div>
                <h6 className="text-[16px] text-center font-[500]">
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
        <div className="flex gap-[50px] justify-end">
          <h4 className=" bg-[white] px-[35px] py-[5px] text-[24px] font-[500] rounded-[6px] shadow-customerCardShadow cursor-pointer active:scale-[1.03]">
            Cancel
          </h4>
          <h4 className=" bg-brand px-[35px] py-[5px] text-[24px] font-[500] rounded-[6px] shadow-customerCardShadow cursor-pointer active:scale-[1.03]">
            Update
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Profile;
