import React, { useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import successGif from "../../assets/success.gif";
import { TextField } from "@mui/material";

const ForgetPassword = ({ onClose }) => {
  const [isEnterPass, setIsEnterPass] = useState(false);
  const [isSucessModal, setIsSucessModal] = useState(false);

  const handleProceed = () => {
    setIsEnterPass(true);
  };

  useMemo(() => {
    isSucessModal &&
      setTimeout(() => {
        onClose();
      }, 3000);
  }, [isSucessModal]);
  return (
    <div className="w-[630px] h-[450px] bg-[white] shadow-cardShadow p-[20px] rounded-[10px]">
      {isSucessModal ? (
        <SuccessModal />
      ) : (
        <>
          <div className="pb-5">
            <div className="flex justify-end">
              <AiOutlineClose
                className="text-[30px] text-[#575555] cursor-pointer"
                onClick={() => onClose()}
              />
            </div>

            <h3 className="text-[32px] mt-[-30px] text-center font-[600] text-[#575555]">
              Forget Password
            </h3>
          </div>
          <div className="h-[1px] w-[calc(40px+100%)] relative left-[-20px] bg-[#D9D9D9] shadow-[0px 0.15px 4px 0px rgba(0, 0, 0, 0.25)]"></div>
          <div>
            {isEnterPass ? (
              <div className="p-[50px] flex flex-col gap-[50px]">
                <TextField
                  className="w-[100%] py-1 px-3 bg-white text-[20px] text-[#767575] border-b-[1px] outline-none border-[#A3A3A3]"
                  required
                  id="outlined-required"
                  label="Set New Password"
                  // defaultValue="Hello World"
                  onChange={(e) => {}}
                />
                <TextField
                  className="w-[100%] py-1 px-3 bg-white text-[20px] text-[#767575] border-b-[1px] outline-none border-[#A3A3A3]"
                  required
                  id="outlined-required"
                  label="Confirm Password"
                  // defaultValue="Hello World"
                  onChange={(e) => {}}
                />
                <div className=" ">
                  <button
                    onClick={() => {
                      setIsSucessModal(true);
                    }}
                    className="p-[10px] rounded-[10px] shadow-cardShadow bg-brand hover:bg-opacity-90 w-[100%] text-[24px] text-[white] font-[500]"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-[50px] mt-[50px]">
                <TextField
                  className="w-[100%] py-1 px-3 bg-white text-[20px] text-[#767575] border-b-[1px] outline-none border-[#A3A3A3]"
                  required
                  id="outlined-required"
                  label="Mobile Number"
                  // defaultValue="Hello World"
                  onChange={(e) => {}}
                />
                <div className="mt-[60px]">
                  <button
                    onClick={handleProceed}
                    className="p-[10px] rounded-[10px] shadow-cardShadow bg-brand hover:bg-opacity-90 w-[100%] text-[24px] text-[white] font-[500]"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const SuccessModal = () => {
  return (
    <div className="h-[100%]">
      <img src={successGif} className="w-[300px] m-auto" />
      <h3 className="text-[#068A0C] text-[24px] font-[600] text-center ">
        New Password Updated Successfully !
      </h3>

      <h4 className="text-[black] text-[20px] font-[600] text-center mt-5 underline">
        Please login now
      </h4>
    </div>
  );
};

export default ForgetPassword;
