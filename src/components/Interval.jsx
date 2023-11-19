// import React from "react";
// import styled from "styled-components";

// import Icon from "./Icon";

// import backIcon from "../assets/icons/chevron-left.svg";
// import nextIcon from "../assets/icons/chevron-right.svg";

// const Container = styled.div`
//   display: grid;
//   grid-template-columns: 40px max-content 40px;
//   grid-gap: 8px;
//   align-items: center;
//   justify-content: center;

//   .content {
//     padding: 8px;
//     border-radius: 4px;
//     color: #737272;
//     border: 1px solid #e2e8f0;
//   }

//   .icon-wrapper {
//     padding: 10px;
//     border-radius: 4px;
//     height: 40px;
//     width: 40px;
//     border: 1px solid #e2e8f0;
//   }
// `;

// const Interval = (props) => {
//   const { intervalText, handleOnBackClick, handleOnNextClick } = props;

//   return (
//     <Container>
//       <Icon
//         src={backIcon}
//         onClick={handleOnBackClick}
//         className="icon-wrapper"
//       />
//       <div className="content">{intervalText}</div>
//       <Icon
//         src={nextIcon}
//         onClick={handleOnNextClick}
//         className="icon-wrapper"
//       />
//     </Container>
//   );
// };

// export default Interval;

import React, { useState, useEffect } from "react";

const Interval = () => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    // Update the start date when the component mounts
    setStartDate(new Date());
  }, []);

  const handleBack = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    setStartDate(newStartDate);
  };

  const handleNext = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);
  };

  const formatDateString = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const getWeekInterval = (start) => {
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return `${formatDateString(start)} - ${formatDateString(end)}`;
  };

  return (
    <div>
      <h2>Week Interval</h2>
      <button onClick={handleBack}>Back</button>
      <p>{getWeekInterval(startDate)}</p>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Interval;
