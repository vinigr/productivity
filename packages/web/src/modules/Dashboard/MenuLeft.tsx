import React from 'react';
import styled, { css } from 'styled-components';
import { Home, InsertChart, BrightnessMedium, SettingsPower } from '@styled-icons/material-rounded';

const MenuLeft = () => {
  return (
    <Wrapper>
      <GroupIcons>
        <HomeIcon />
        <InsertChartIcon />
      </GroupIcons>

      <GroupIcons>
        <BrightnessMediumIcon />
        <PowerIcon />
      </GroupIcons>
    </Wrapper>
  );
};

export default MenuLeft;

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  background-color: ${(props) => props.theme.background};
  height: 100vh;
  width: 50px;
`;

const GroupIcons = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyleIcon = css`
  color: ${(props) => props.theme.icon};
  width: 36px;
`;

const HomeIcon = styled(Home)`
  ${StyleIcon};
  margin-bottom: 8px;
`;

const InsertChartIcon = styled(InsertChart)`
  ${StyleIcon};
`;

const BrightnessMediumIcon = styled(BrightnessMedium)`
  ${StyleIcon};
  margin-bottom: 8px;
`;

const PowerIcon = styled(SettingsPower)`
  ${StyleIcon};
`;
