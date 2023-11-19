import React from "react";
import { useDrag } from "react-dnd";
import moment from "moment";

const Appointment = ({ appointment }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "APPOINTMENT",
    item: {
      id: appointment.id,
      start_time: appointment.start_time,
      end_time: appointment.end_time,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const height =
    (moment(appointment.end_time).diff(appointment.start_time, "minutes") /
      30) *
    20;

  return (
    <div
      ref={drag}
      style={{
        border: "1px solid #000",
        padding: "5px",
        backgroundColor: isDragging ? "lightblue" : "white",
        cursor: "move",
        position: "absolute",
        width: "100%",
        top: 0,
        left: 0,
        height: `${height}px`,
        zIndex: 4,
      }}
    >
      {appointment.patient_name}
    </div>
  );
};

export default Appointment;
