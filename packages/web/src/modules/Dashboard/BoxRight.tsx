import React from 'react';
import styled from 'styled-components';
import { AddBox } from '@styled-icons/material-rounded';

const Box = () => {
  return (
    <Wrapper>
      <WrapperTitle>
        <Title>Meus projetos</Title>
        <AddBoxIcon />
      </WrapperTitle>
      <WrapperTitle>
        <Title>Minhas atividades</Title>
        <AddBoxIcon />
      </WrapperTitle>
    </Wrapper>
  );
};

export default Box;

const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  background-color: ${(props) => props.theme.immutableBoxes};
  height: 100vh;
  width: 280px;
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
