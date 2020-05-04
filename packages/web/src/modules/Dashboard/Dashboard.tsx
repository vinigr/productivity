import React from 'react';
import styled from 'styled-components';
import MenuLeft from './MenuLeft';

const Dashboard = () => {
  return (
    <Wrapper>
      <MenuLeft></MenuLeft>Dashboard
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
`;
