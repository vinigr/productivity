import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { Home, InsertChart, BrightnessMedium, SettingsPower } from '@styled-icons/material-rounded';
import ThemeContext from '../../contexts/ThemeContext';
import ModalExit from './ModalExit';

const MenuLeft = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const theme = useContext(ThemeContext);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <Wrapper>
      <GroupIcons>
        <Link to="home">
          <HomeIcon />
        </Link>

        <InsertChartIcon />
      </GroupIcons>

      <GroupIcons>
        <Button onClick={theme?.handleTheme}>
          <BrightnessMediumIcon />
        </Button>

        <Button onClick={toggleModal}>
          <PowerIcon />
        </Button>
      </GroupIcons>

      <ModalExit isOpen={modalIsOpen} toggleModal={toggleModal} />
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
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
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
