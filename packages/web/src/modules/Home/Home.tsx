import React from 'react';
import styled from 'styled-components';
import BoxTop from './BoxTop';

const Home = () => {
  return (
    <Wrapper>
      <BoxTop />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: calc(100% - 330px);
`;
