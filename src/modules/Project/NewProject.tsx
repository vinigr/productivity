import React from 'react';
import styled from 'styled-components';
import Form from './Form';

import { ContainerTop, Title } from './styles';

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
