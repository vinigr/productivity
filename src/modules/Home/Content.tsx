import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Activities from '../common/Activities';
import { IActivity } from '../../interfaces';

import api from '../../services/api';

const Content = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const activitiesData = await api.get('activities');

      setActivities(activitiesData.data.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Activities activities={activities} loading={loading} />
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
