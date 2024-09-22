import React from "react";
import { FadeLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div
      className={`h-full w-full bottom-0 right-0  bg-[#3939393d] flex justify-center items-center opacity-[1]`}
    >
      {/* <CircularProgress /> */}
      <FadeLoader color="black" />
    </div>
  );
};

export default Spinner;
