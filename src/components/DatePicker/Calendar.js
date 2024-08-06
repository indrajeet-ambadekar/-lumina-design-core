// src/Calendar.js
import React, { useState, useEffect, useRef } from "react";
import ChevronLeft from "../../assets/icons/ChevronLeft";
import ChevronRight from "../../assets/icons/ChevronRight";

const getValidStartDate = (date, minDate, maxDate) => {
  if (!date) return new Date(); // Return current date if no date is provided
  if (minDate && date < minDate) return minDate; // If the date is before the minimum date, return minDate
  if (maxDate && date > maxDate) return maxDate; // If the date is after the maximum date, return maxDate
  return date; // Otherwise, return the provided date
};
const Calendar = ({
  selectedDate,
  onDateClick,
  setIsCalendarVisible,
  minDate,
  maxDate
}) => {
  const [currentDate, setCurrentDate] = useState(
    getValidStartDate(selectedDate, minDate, maxDate)
  );
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setCurrentDate(getValidStartDate(selectedDate, minDate, maxDate));
  }, [selectedDate, minDate, maxDate]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = new Date();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const isDateInRange = (date) => {
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return true;
  };

  const isTodayInRange = isDateInRange(today);

  const generateCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const isToday =
        isTodayInRange && today.toDateString() === date.toDateString();
      const isDisabled = !isDateInRange(date);
      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? "selected" : ""} ${isToday ? "today" : ""} ${isDisabled ? "disabled" : ""}`}
          tabIndex={isDisabled ? -1 : 0}
          onClick={() => !isDisabled && onDateClick(date)}
          onKeyDown={(e) => !isDisabled && handleDayKeyDown(e, date)}
          role="button"
          aria-selected={isSelected}
          aria-disabled={isDisabled}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  const handleDayKeyDown = (e, date) => {
    if (e.key === "Enter" || e.key === " ") {
      onDateClick(date);
    }
    if (e.key === "ArrowLeft") {
      setCurrentDate(new Date(currentYear, currentMonth, date.getDate() - 1));
    }
    if (e.key === "ArrowRight") {
      setCurrentDate(new Date(currentYear, currentMonth, date.getDate() + 1));
    }
    if (e.key === "ArrowUp") {
      setCurrentDate(new Date(currentYear, currentMonth, date.getDate() - 7));
    }
    if (e.key === "ArrowDown") {
      setCurrentDate(new Date(currentYear, currentMonth, date.getDate() + 7));
    }
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentYear, currentMonth - 1, 1);
    if (!minDate || newDate >= minDate) {
      setCurrentDate(newDate);
    }
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentYear, currentMonth + 1, 1);
    if (!maxDate || newDate <= maxDate) {
      setCurrentDate(newDate);
    }
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar" ref={calendarRef}>
      <div className="calendar-header">
        <button
          onClick={handlePrevMonth}
          disabled={
            minDate && new Date(currentYear, currentMonth, 1) <= minDate
          }
        >
          <ChevronLeft width={16} height={16} />
        </button>
        <span>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentYear}
        </span>
        <button
          onClick={handleNextMonth}
          disabled={
            maxDate && new Date(currentYear, currentMonth + 1, 1) > maxDate
          }
        >
          <ChevronRight width={16} height={16} />
        </button>
      </div>
      <div className="calendar-weekdays">
        {weekDays.map((day) => (
          <div key={day} className="calendar-weekday">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-body">{generateCalendarDays()}</div>
    </div>
  );
};

export default Calendar;
