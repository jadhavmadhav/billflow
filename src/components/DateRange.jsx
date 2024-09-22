import React, { useState } from "react";
import DateRangePickerComp from "./DateRange/DateRangePicker";
import { Modal } from "@mui/material";

const DateRange = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState();
  const handleDateRange = () => {
    setIsOpen(!isOpen);
  };
  const handleDateRangeClose = () => {
    setIsOpen(false);
  };
  const handleConfirmSelection = (selectedRange) => {
    setState(selectedRange[0]);
    setIsOpen(false);
  };
  console.log("state", state);
  return (
    <>
      <div
        className="w-[300px] text-center p-[10px] border border-[#A3A3A3] rounded-[6px] cursor-pointer"
        onClick={handleDateRange}
      >
        <h6 className="font-[500] text-[18px] text-[#A3A3A3] ">
          2023-01-01 To 2023-12-31
        </h6>
      </div>
      <Modal
        open={isOpen}
        onClose={handleDateRangeClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DateRangePickerComp handleConfirmSelection={handleConfirmSelection} />
      </Modal>
    </>
  );
};

export default DateRange;
