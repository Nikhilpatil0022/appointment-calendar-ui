import React from "react";
import styled from "styled-components";

import Icon from "./Icon";

import backIcon from "../assets/icons/chevron-left.svg";
import nextIcon from "../assets/icons/chevron-right.svg";

const Container = styled.div`
  display: grid;
  grid-template-columns: 40px max-content 40px;
  grid-gap: 8px;
  align-items: center;
  justify-content: center;

  .content {
    padding: 8px;
    border-radius: 4px;
    color: #737272;
    border: 1px solid #e2e8f0;
  }

  .icon-wrapper {
    padding: 10px;
    border-radius: 4px;
    height: 40px;
    width: 40px;
    border: 1px solid #e2e8f0;
  }
`;

const Interval = (props) => {
  const { intervalText, handleOnBackClick, handleOnNextClick } = props;

  return (
    <Container>
      <Icon
        src={backIcon}
        onClick={handleOnBackClick}
        className="icon-wrapper"
      />
      <div className="content">{intervalText}</div>
      <Icon
        src={nextIcon}
        onClick={handleOnNextClick}
        className="icon-wrapper"
      />
    </Container>
  );
};

export default Interval;
