import React from 'react';
import styled from 'styled-components';
import Form from './Form';

const NewProject = () => {
  return (
    <Wrapper>
      <ContainerTop>
        <Title>Novo projeto</Title>
      </ContainerTop>
      <Form />
    </Wrapper>
  );
};

export default NewProject;

const Wrapper = styled.div`
  display: flex;
`;

const ContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${(props) => props.theme.titleBox};
  height: 60px;
  border-radius: 0px 0px 4px 4px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: calc(100% - 330px);
  z-index: 10;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 24px;
  color: ${(props) => props.theme.text};
`;
