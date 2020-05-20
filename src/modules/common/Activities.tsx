import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { AddBox } from '@styled-icons/material-rounded';

import Activity from './Activity';
import { IActivity } from '../../interfaces';
import Loading from './Loading';

interface ActivitiesProps {
  activities: IActivity[];
  loading?: boolean;
}

const Activities = ({ activities, loading }: ActivitiesProps) => {
  return (
    <Wrapper>
      {loading ? (
        <Loading smaller />
      ) : (
        <>
          <Header>
            <Title>Atividades</Title>
          </Header>

          {activities.map((activity) => (
            <Activity key={activity.id} activity={activity} />
          ))}
        </>
      )}
    </Wrapper>
  );
};

export default Activities;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.titleBox};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 20px;
  color: ${(props) => props.theme.text};
`;

const ButtonAdd = styled.button`
  border: none;
  background-color: transparent;
`;

const AddBoxIcon = styled(AddBox)`
  color: ${(props) => props.theme.titleBoxRight};
  width: 30px;
`;
