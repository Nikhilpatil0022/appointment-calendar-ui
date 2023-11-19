import React from "react";
import { useDrag } from "react-dnd";
import moment from "moment";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #000;
  padding: 5px;
  backgroundcolor: ${(props) => (props.isDragging ? "lightblue" : "white")};
  cursor: move;
  height: 100%;
  zindex: 4;
`;

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

  return (
    <Container ref={drag} isDragging={isDragging}>
      {appointment.patient_name}
    </Container>
  );
};

export default Appointment;
