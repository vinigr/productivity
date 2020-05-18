import React, { useState } from 'react';
import styled from 'styled-components';
import Activities from '../common/Activities';
import { IActivity } from '../../interfaces';

const Content = () => {
  const [activities, setActivities] = useState<IActivity[]>([
    { id: 1, description: 'Fazer trabalho', final_date: new Date(), status: 'to do' },
  ]);

  return (
    <Wrapper>
      <Activities activities={activities} />
    </Wrapper>
  );
};

export default Content;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin-top: 60px;
  padding: 10px;
`;
