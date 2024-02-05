import React from "react";
import { css } from "styled-components";

const StyledDiv = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

const yourStyles = css`
  background-color: gray;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: blue;
  }
`;

const YourComponent = () => {
  return (
    <StyledDiv>
      {/* Your content goes here */}
      Hello Moto
    </StyledDiv>
  );
};

export default YourComponent;
