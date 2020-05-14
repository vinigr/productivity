import React from 'react';
import { Outlet } from 'react-router-dom';

import styled from 'styled-components';
import MenuLeft from './MenuLeft';
import Box from './BoxRight';

const Dashboard = () => {
  return (
    <Wrapper>
      <MenuLeft />
      <Content>
        <Outlet />
      </Content>
      <Box />
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  max-width: 100vw;
  justify-content: space-between;
  background-color: ${(props) => props.theme.background};
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: calc(100% - 330px);
  max-width: calc(100% - 330px);
  margin-left: 50px;
  margin-right: 280px;
  background-color: ${(props) => props.theme.background};
`;
