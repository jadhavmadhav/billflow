import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { baseURL } from "../httpCommon";
import { DeleteCustomerById } from "../services/customerServices";
import useToast from "../hooks/useToast";

const CustomerCard = ({ data }) => {
  const { _id, image, name, customerId, mobileNumber } = data;

  const Navigate = useNavigate();
  const { showToast } = useToast();

  const handleDelete = () => {
    try {
      const request = DeleteCustomerById(_id);
      const response = request.data;
      if (response.status == 200) {
        showToast(response.message, "success");
      }
    } catch (error) {}
  };

  return (
    <div>
      <div
        className="flex gap-[10%] w-[100%] rounded-[6px] p-4 shadow-cardShadow cursor-pointer"
        onClick={() => {
          Navigate(`/customers/${customerId}`);
        }}
      >
        <div className="w-[100%]  flex justify-between">
          <div className="flex gap-5 items-center">
            <h6 className="font-[600] text-[16px] text-[#171414] ">Name :</h6>
            <h6 className="font-[300] text-[20px] text-[#030202]  capitalize  ">
              {name ?? ""}
            </h6>
          </div>

          <div className="flex gap-5 items-center">
            <h6 className="font-[600] text-[16px] text-[#171414]">
              Mobile No :
            </h6>
            <h6 className="font-[300] text-[20px] text-[#4c4c4c]">
              {mobileNumber ?? ""}
            </h6>
          </div>
          <div className="flex gap-5 items-center">
            <h6 className="font-[600] text-[16px] text-[#171414]">
              Customer Id :{" "}
            </h6>
            <h6 className="font-[300] text-[20px] text-[#4c4c4c]">
              {customerId ?? ""}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
