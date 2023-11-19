import React from "react";
import moment from "moment";
import AppointmentTableCell from "./AppointmentTableCell";

const WeekTable = ({ appointments, onDrop, selectedWeek }) => {
  const dateFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}></th>
          {selectedWeek.map((day, index) => (
            <th
              key={index}
              style={{ border: "1px solid #ddd", padding: "8px" }}
            >
              {day.toLocaleDateString(undefined, dateFormatOptions)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 24 }).map((_, hourIndex) => (
          <tr key={hourIndex}>
            <td
              style={{ border: "1px solid #ddd", padding: "8px" }}
            >{`${hourIndex}:00`}</td>
            {selectedWeek.map((day, dayIndex) => (
              <AppointmentTableCell
                key={dayIndex}
                day={day}
                hour={hourIndex}
                appointments={appointments}
                onDrop={onDrop}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeekTable;
