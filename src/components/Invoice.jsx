import React, { useEffect } from "react";
import { useState } from "react";
import { getInvoicesByInvoiceNo } from "../services/reports";
import Spinner from "./Spinner";
import { CircularProgress } from "@mui/material";

const Invoice = ({ invoiceNo, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sellerDetails, setSellerDetails] = useState();
  const [billDetails, setBillDetails] = useState();
  const [customerDetails, setCustomerDetails] = useState();

  let TaxableAmount = 0;
  let GrandTotal = 0;
  const handleDownload = () => {
    window.print();
  };
  const GetInvoiceData = async () => {
    try {
      setIsLoading(true);
      const request = await getInvoicesByInvoiceNo(invoiceNo);
      const response = await request.data;
      if (response.status == 200) {
        setCustomerDetails({
          ...response.result.customerDetails,
          products: response.result.billDetails.items,
        });
        setSellerDetails(response.result.userDetails);
        setBillDetails({
          billId: response.result.billDetails.billId,
          invoiceDate: response.result.invoiceDate,
          dueDate: response.result.dueDate,
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    GetInvoiceData();
  }, []);

  return (
    <div className=" h-full w-full grid place-content-center">
      <div className="bg-[white] rounded-[6px] shadow-cardShadow w-[1138px] relative overflow-scroll">
        {isLoading && (
          <div className="absolute flex justify-center items-center h-[100%]  w-[100%] opacity-[0.8] bg-[#42414157] ">
            <CircularProgress />
          </div>
        )}
        <h1
          className="cursor-pointer text-[30px] font-[300] absolute w-[100%] p-5 flex justify-end"
          onClick={() => onClose()}
        >
          X
        </h1>

        <div>
          <button
            className="absolute top-5 right-5 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>

        <div className=" p-[30px]">
          <h5 className="text-[20px] font-[500]">{`${sellerDetails?.ownerFirstName} ${sellerDetails?.ownerLastName}`}</h5>
          <h6 className="text-[14px] text-[#767575] font-[600]">
            {sellerDetails?.address},
          </h6>
          <h6 className="text-[14px] text-[#767575] font-[600]">
            Mobile Number: {sellerDetails?.mobileNumber}
          </h6>
          <h6 className="text-[14px] text-[#767575] font-[600]">
            GST No: {sellerDetails?.gstNumber}
          </h6>
          <h6 className="text-[14px] text-[#767575] font-[600]">
            {sellerDetails?.email}
          </h6>
        </div>
        <div className=" border-t-[1px] border-[#D9D9D9]">
          <div className="w-[50%] border-r-[1px] border-[#D9D9D9] py-[15px] px-[30px]">
            <div className="flex justify-between">
              <spa className="text-[14px] font-[500] ">Bill#</spa>
              <spa className="text-[14px] font-[500] w-[50%] ">
                : {billDetails?.billId}
              </spa>
            </div>
            <div className="flex justify-between">
              <spa className="text-[14px] font-[500] ">Invoice Date</spa>
              <spa className="text-[14px] font-[500] w-[50%] ">
                : {billDetails?.invoiceDate}
              </spa>
            </div>
            <div className="flex justify-between">
              <spa className="text-[14px] font-[500] ">Terms</spa>
              <spa className="text-[14px] font-[500] w-[50%] ">
                : Due on Receipt
              </spa>
            </div>
            <div className="flex justify-between">
              <spa className="text-[14px] font-[500] ">Due Date</spa>
              <spa className="text-[14px] font-[500] w-[50%] ">
                : {billDetails?.dueDate}
              </spa>
            </div>
          </div>
          <div className="bg-[#d8d6d679] flex ">
            <h5 className="w-[50%] py-[5px] px-[30px] text-[14px] font-[600] border-r-[1px] border-[#D9D9D9]">
              Bill To
            </h5>
            <h5 className="w-[50%] py-[5px] px-[30px] text-[14px] font-[600]">
              Ship To
            </h5>
          </div>
          <div className="flex">
            <div className="w-[50%] px-[30px] py-[15px]  border-r-[1px] border-[#D9D9D9]">
              <h5 className="text-[14px] font-[600]">{`${sellerDetails?.ownerFirstName} ${sellerDetails?.ownerLastName}`}</h5>
              <h6 className="text-[14px] font-[500]">
                {sellerDetails?.address}
              </h6>
              <h6 className="text-[14px] font-[500]">
                {sellerDetails?.mobileNumber}
              </h6>
            </div>
            <div className="w-[50%] px-[30px] py-[15px] ">
              <h5 className="text-[14px] font-[600]">
                {customerDetails?.name}
              </h5>
              <h6 className="text-[14px] font-[500]">
                {customerDetails?.address}
              </h6>
            </div>
          </div>
        </div>

        <div className="">
          <table className="w-[100%]">
            <thead className=" bg-[#D9D9D9] text-[14px] ">
              <tr className=" text-[14px]">
                <th>#</th>
                <th>Items</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>GST</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {customerDetails?.products?.map((item, index) => {
                const {
                  productName,
                  quantity,
                  measurement,
                  sellingPrice,
                  gst,
                } = item;

                const totalPrice = item.quantity * sellingPrice;
                {
                  /* const tAmount = (totalPrice * 18) / 100;
                TaxableAmount += tAmount; */
                }
                GrandTotal += totalPrice;
                return (
                  <tr className="font-[500] text-[14px] text-[#767575] border-b-[1px] border-[#767575]">
                    <td>{index + 1}</td>
                    <td>{productName}</td>
                    <td>
                      {quantity} ({measurement})
                    </td>
                    <td>{sellingPrice}</td>
                    <td>{gst}%</td>
                    <td>{totalPrice}</td>
                  </tr>
                );
              })}
              <tr className="font-[500] text-[15px] border-b-[1px] border-[#767575]">
                <td colSpan={4}></td>
                <td>Sub Total</td>
                <td>{GrandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end">
            <div className="w-[300px] py-[10px] border-b-[1px] border-[#D9D9D9]">
              <div className="flex">
                <h5 className="w-[50%]">Taxable Amount</h5>
                <h5 className="w-[50%] ">
                  {((GrandTotal * 18) / 100).toFixed(2)}
                </h5>
              </div>
              <div className="flex mt-2">
                <h5 className="w-[50%] font-[600]">Total</h5>
                <h5 className="w-[50%] font-[600]">{GrandTotal.toFixed(2)}</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="p-[30px]">
          <div>
            <h5 className="text-[#767575] font-[500] text-[14px]">
              Thanks for shopping with us.
            </h5>
            <h5 className="font-[600] text-[14px]">Terms & Conditions</h5>
            <h5 className="text-[#767575] font-[500] text-[14px]">
              Full payment is due upon receipt of this invoice.
            </h5>
            <h5 className="text-[#767575] font-[500] text-[14px]">
              Late payments may incur additional charges or interest as per the
              applicable laws.
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
