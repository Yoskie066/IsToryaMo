import React, { useState } from "react";
import { MdOutlineDateRange, MdClose } from "react-icons/md";
import { DayPicker } from "react-day-picker";
import moment from "moment";

const DateSelector = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <div>
      <button
        className="inline-flex items-center gap-2 text-[13px] font-medium text-indigo-600 bg-indigo-200/40 hover:bg-indigo-200/70 rounded px-2 py-1 cursor-pointer"
        onClick={() => {
          setOpenDatePicker(true);
        }}
      >
        <MdOutlineDateRange className="text-lg" />
        {date
          ? moment(date).format("Do MMM YYYY")
          : moment().format("Do MMM YYYY")}
      </button>

      {openDatePicker && (
        <div className="overflow-y-scroll p-5 bg-indigo-50/80 rounded-lg relative pt-9">
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-100 hover:bg-indigo-100 absolute top-2 right-2"
            onClick={() => {
              setOpenDatePicker(false);
            }}
          >
            <MdClose className="text-xl text-indigo-600" />
          </button>

          <DayPicker
            captionLayout="dropdown-buttons"
            mode="single"
            selected={date}
            onSelect={setDate}
            pagedNavigation
          />
        </div>
      )}
    </div>
  );
};

export default DateSelector;



