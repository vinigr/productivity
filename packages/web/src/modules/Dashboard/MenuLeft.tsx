import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { Home, InsertChart, BrightnessMedium, SettingsPower } from '@styled-icons/material-rounded';
import ThemeContext from '../../contexts/ThemeContext';

const MenuLeft = () => {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      <GroupIcons>
        <HomeIcon />
        <InsertChartIcon />
      </GroupIcons>

      <GroupIcons>
        <Button onClick={theme?.handleTheme}>
          <BrightnessMediumIcon />
        </Button>

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
  background-color: ${(props) => props.theme.immutableBoxes};
  height: 100vh;
  width: 50px;
`;

const GroupIcons = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border: none;
  margin-bottom: 8px;
  background-color: transparent;
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
`;

const PowerIcon = styled(SettingsPower)`
  ${StyleIcon};
`;
