import React from "react";
import styled from "styled-components";

const Wrapper = styled.img`
  ${(props) => (props.handleOnClick ? "cursor: pointer" : "")};
  ${(props) =>
    props.disabled
      ? `
        cursor: not-allowed;
        opacity: 0.5;
        `
      : ""};
`;

const Icon = (props) => {
  return <Wrapper {...props} />;
};

export default Icon;
