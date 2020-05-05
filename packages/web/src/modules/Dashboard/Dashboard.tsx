import React from 'react';
import * as RRD from 'react-router-dom';

import styled from 'styled-components';
import MenuLeft from './MenuLeft';
import Box from './BoxRight';

const Outlet = (RRD as any).Outlet;

const Dashboard = () => {
  return (
    <Wrapper>
      <MenuLeft />
      <Outlet />
      <Box />
    </Wrapper>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: space-between;
  background-color: ${(props) => props.theme.background};
`;
