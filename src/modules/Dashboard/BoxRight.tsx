import React from 'react';
import styled from 'styled-components';
import { AddBox } from '@styled-icons/material-rounded';
import { Link } from 'react-router-dom';

const Box = () => {
  return (
    <Wrapper>
      <WrapperTitle>
        <Title>Meus projetos</Title>
        <Link to="/new-project">
          <AddBoxIcon />
        </Link>
      </WrapperTitle>
      <WrapperTitle>
        <Title>Minhas atividades</Title>
        <Link to="/new-activity">
          <AddBoxIcon />
        </Link>
      </WrapperTitle>
    </Wrapper>
  );
};

export default Box;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  background-color: ${(props) => props.theme.immutableBoxes};
  min-height: 100vh;
  height: 100%;
  width: 280px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
`;

const WrapperTitle = styled.div`
  display: flex;
  padding: 0 16px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.titleBoxRight};
  font-size: 20px;
`;

const AddBoxIcon = styled(AddBox)`
  color: ${(props) => props.theme.titleBoxRight};
  width: 24px;
`;