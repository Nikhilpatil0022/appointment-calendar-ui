import React from "react";
import Styled from "styled-components";

const ListWrapper = Styled.div`
    background: white;
    padding: 8px;
    border-radius: 4px;
`;

const ListItem = Styled.div`
    background: white;
    padding: 4px;
    border-bottom: 1px solid #383d3d;
`;

const List = (props) => {
  const { children } = props;

  return <ListWrapper>{children}</ListWrapper>;
};

export { List, ListWrapper, ListItem };
