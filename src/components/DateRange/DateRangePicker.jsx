import { addDays } from "date-fns";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

const DateRangePickerComp = ({ handleConfirmSelection }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [selectedRange, setSelectedRange] = useState(state);

  const handleSelectRange = (ranges) => {
    setSelectedRange([ranges.selection]);
  };

  // const handleConfirmSelection = () => {
  //   setState(selectedRange);
  // };

  return (
    <div className="flex justify-center items-center h-screen  ">
      <div className="bg-[white] w-[900px] p-5  flex flex-col rounded-lg shadow-customerCardShadow">
        <DateRangePicker
          onChange={handleSelectRange}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={selectedRange}
          direction="horizontal"
        />
        <div className="border-t border-[#fed1d1] pt-3 fle justify-end a">
          <button
            onClick={() => {
              handleConfirmSelection(selectedRange);
            }}
            className="text-[18px] text-[white] font-[800] bg-brand py-2 px-6 rounded-[7px] shadow-cardShadow active:scale-[1.05] "
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePickerComp;
