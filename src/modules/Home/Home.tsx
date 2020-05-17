import React from 'react';
import styled from 'styled-components';
import BoxTop from './BoxTop';
import Content from './Content';

const Home = () => {
  return (
    <Wrapper>
      <BoxTop />
      <Content />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  height: calc(100vh - 60px);
`;
