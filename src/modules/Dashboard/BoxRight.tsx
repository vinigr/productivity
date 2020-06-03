import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AddBox, Refresh } from '@styled-icons/material-rounded';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { IProject } from '../../interfaces';

const Box = () => {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data.data);
    } catch (error) {}
  };

  return (
    <Wrapper>
      <WrapperTitle>
        <Title>Meus projetos</Title>
        <div>
          <ButtonRefresh>
            <RefreshIcon />
          </ButtonRefresh>

          <Link to="/new-project">
            <AddBoxIcon />
          </Link>
        </div>
      </WrapperTitle>
      {projects.map((project) => (
        <Project key={project.id} to={`/project/${project.id}`}>
          <NameProject>{project.name}</NameProject>
        </Project>
      ))}
    </Wrapper>
  );
};

export default Box;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px 10px;
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.titleBoxRight};
  font-size: 20px;
`;

const AddBoxIcon = styled(AddBox)`
  color: ${(props) => props.theme.titleBoxRight};
  width: 24px;
`;

const ButtonRefresh = styled.button`
  border: none;
  background-color: transparent;
  margin-right: 4px;
`;

const RefreshIcon = styled(Refresh)`
  color: ${(props) => props.theme.titleBoxRight};
  width: 24px;
`;

const Project = styled(Link)`
  background-color: ${(props) => props.theme.itemList};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 6px;
  text-decoration: none;

  &::last-child {
    margin-bottom: 10px;
  }
`;

const NameProject = styled.h2`
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => props.theme.titleItemList};
  margin-bottom: 4px;
`;
