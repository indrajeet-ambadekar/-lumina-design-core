// src/Datepicker.js
import React, { useState, useEffect, useRef } from "react";
import "./Datepicker.scss";
import Calendar from "./Calendar";
import CalendarIcon from "../../assets/icons/CalendarAlt";
const Datepicker = ({ ...props }) => {
  const {
    value,
    onChange,
    minDate,
    maxDate,
    className = "",
    id = null,
    tabIndex = null
  } = props;
  const [selectedDate, setSelectedDate] = useState(value || new Date());
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
    }
  }, [value]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsCalendarVisible(false);
    onChange(date);
  };

  const toggleCalendarVisibility = (e) => {
    if (
      e.type === "click" ||
      (e.type === "keydown" && (e.key === "Enter" || e.key === " "))
    ) {
      setIsCalendarVisible(!isCalendarVisible);
    }
  };

  return (
    <div className={`${className || ""} datepicker`} id={id}>
      <div className="input-wrapper">
        <input
          type="text"
          value={selectedDate.toDateString()}
          readOnly
          onClick={toggleCalendarVisibility}
          onKeyDown={toggleCalendarVisibility}
          aria-haspopup="true"
          aria-expanded={isCalendarVisible}
          role="combobox"
          tabIndex={tabIndex}
        />
        <button onClick={() => setIsCalendarVisible(!isCalendarVisible)}>
          <CalendarIcon width={17} height={17} />
        </button>
      </div>

      {isCalendarVisible && (
        <Calendar
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
          setIsCalendarVisible={setIsCalendarVisible}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </div>
  );
};

export default Datepicker;
