import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.background};
`;

const Spinner = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;

  &:after {
    content: ' ';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${(props) => props.theme.text};
    border-color: ${(props) => `transparent ${props.theme.text} transparent ${props.theme.text}`};
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
