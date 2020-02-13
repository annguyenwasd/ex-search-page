import React from "react";
import styled from "styled-components/macro";
import { Frown } from "react-feather";

function NotFound() {
  return (
    <Wrapper>
      <Frown width={50} height={50} />
      <h1>This page is not implemented yet!!!</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 20%;
  color: white;
`;

NotFound.propTypes = {};

NotFound.defaultProps = {};

export default NotFound;
