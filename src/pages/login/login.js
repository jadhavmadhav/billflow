import React from "react";
import { useState } from "react";
import ForgetPassword from "./forgetPassword";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { apiRequestWithoutAuth } from "../../AxiosInstance";

const user_credentials = {
  mobile_number: "7620643217",
  password: "Smart@123",
};
const Login = () => {
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [Credentials, setCredentials] = useState({});

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const req = await apiRequestWithoutAuth("post", `/login`, {
        mobile_number: Credentials.mobile_number,
        password: Credentials.password,
      });
      const token = await req.token;
      localStorage.setItem("session", token);
      localStorage.setItem("isLogin", JSON.stringify(true));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
    // if (
    //   Credentials.mobile_number === user_credentials.mobile_number &&
    //   Credentials.password === user_credentials.password
    // ) {
    //   localStorage.setItem("isLogin", JSON.stringify(true));
    //   navigate("/dashboard");
    // } else {
    //   console.log("is false");
    // }
  };

  const handleNewRegistration = () => {
    navigate("/registration");
  };

  return (
    <>
      {isForgetPassword && (
        <div className="w-[100vw] z-50 absolute  h-[100vh] bg-[black] bg-opacity-10 flex justify-center items-center">
          <ForgetPassword onClose={() => setIsForgetPassword(false)} />
        </div>
      )}
      <div className="h-[100vh] flex justify-center items-center">
        <div className=" bg-white rounded-[10px] shadow-cardShadow">
          <div className="p-[16px] ">
            <img
              src={process.env.PUBLIC_URL + "/favicon.png"}
              className="m-auto w-[100px]"
            />
          </div>

          <div className="w-[100%] h-[1px] bg-[#D9D9D9] shadow-lg"></div>

          <div className="w-[500px] m-[37px] mx-[59px] flex flex-col">
            <div className="mt[37px]">
              <TextField
                className="w-[100%] py-1 px-3 bg-white text-[20px] text-[#767575] border-b-[1px] outline-none border-[#A3A3A3]"
                required
                id="outlined-required"
                label="Mobile Number"
                onChange={(e) =>
                  setCredentials({
                    ...Credentials,
                    mobile_number: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-[100%] mt-[37px]">
              <TextField
                className="w-[100%] py-1 px-3 bg-white text-[20px] text-[#767575] border-b-[1px] outline-none border-[#A3A3A3]"
                required
                id="outlined-required"
                type="password"
                label="Password"
                onChange={(e) =>
                  setCredentials({
                    ...Credentials,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-5  text-right underline text">
              <p
                className="cursor-pointer"
                onClick={() => {
                  setIsForgetPassword(true);
                }}
              >
                Forget password
              </p>
            </div>
            <div className="w-[100%] ">
              <button
                className="w-[100%] bg-brand p-3 rounded-md text-[white] text-[24px] font-bold"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="pt-4">
              <h6
                className="text-[16px] font-[400] underline text-[#3c3cf7] cursor-pointer active:scale-[1.01]"
                onClick={handleNewRegistration}
              >
                Register New Organization
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
