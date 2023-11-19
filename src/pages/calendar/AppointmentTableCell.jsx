import React from "react";
import { useDrop } from "react-dnd";
import moment from "moment";
import Appointment from "./Appointment";

const AppointmentTableCell = ({ day, hour, appointments, onDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "APPOINTMENT",
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const cellHeight =
        monitor.getSourceClientOffset().y -
        monitor.getInitialSourceClientOffset().y;
      const minutes =
        ((clientOffset.y - monitor.getInitialSourceClientOffset().y) /
          cellHeight) *
        60;

      const newStartTime = day;
      newStartTime.setHours(hour, 0);
      onDrop(item.id, newStartTime);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const cellAppointments = appointments.filter(
    (appointment) =>
      moment(appointment.start_time).format("dddd") ===
        moment(day).format("dddd") &&
      moment(appointment.start_time).hour() <= hour &&
      moment(appointment.end_time).hour() > hour
  );

  return (
    <td
      ref={drop}
      style={{
        border: "1px solid #ddd",
        padding: "8px",
        backgroundColor: isOver ? "lightgreen" : "white",
        position: "relative",
      }}
    >
      {cellAppointments.map((appointment) => (
        <Appointment key={appointment.id} appointment={appointment} />
      ))}
    </td>
  );
};

export default AppointmentTableCell;
