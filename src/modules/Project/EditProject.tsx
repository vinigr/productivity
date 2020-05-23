import React from 'react';
import styled from 'styled-components';
import Form from './Form';

import { Link, useParams } from 'react-router-dom';

import { ContainerTop } from './styles';
import { Edit } from '@styled-icons/material-rounded';

const EditProject = () => {
  const params = useParams();

  return (
    <Wrapper>
      <ContainerTop>
        <LinkTop to={`/project/${params.id}`}>Projeto</LinkTop>
        <Options>
          <LinkOption to={`/project/${params.id}/interruptions`}>Interrupções</LinkOption>
          <LinkOption to={`/project/${params.id}/edit`}>
            <EditIcon />
          </LinkOption>
        </Options>
      </ContainerTop>
      <Form edit />
    </Wrapper>
  );
};

export default EditProject;

const Wrapper = styled.div`
  display: flex;
`;

const LinkTop = styled(Link)`
  font-weight: 700;
  font-size: 24px;
  color: ${(props) => props.theme.text};
  text-decoration: none;
`;

const Options = styled.div`
  display: flex;
`;

const LinkOption = styled(Link)`
  font-size: 18px;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  margin: 0 10px;
`;

const EditIcon = styled(Edit)`
  color: ${(props) => props.theme.titleBoxRight};
  width: 20px;
`;
