import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Cancel } from '@styled-icons/material-rounded';

import { IActivity } from '../../interfaces';

interface ActivityProps {
  activity: IActivity;
  deleteActivity: (id: number) => any;
  accessActivity: (id: number) => any;
}

const Activity = ({ activity, deleteActivity, accessActivity }: ActivityProps) => {
  const { id, idLocal, name, initial_date, final_date } = activity;

  return (
    <Wrapper>
      <Main>
        <Name>{name}</Name>
        <Dates>
          {initial_date && <DateText>{format(new Date(initial_date), 'dd/LL HH:mm')}</DateText>}-
          {final_date && <DateText>{format(new Date(final_date), 'dd/LL HH:mm')}</DateText>}
        </Dates>
      </Main>

      <Options>
        <Button onClick={() => deleteActivity(id! || idLocal!)}>
          <CancelIcon />
        </Button>
        <ButtonAccess onClick={() => accessActivity(id! || idLocal!)}>Acessar</ButtonAccess>
      </Options>
    </Wrapper>
  );
};

export default Activity;

const Wrapper = styled.div`
  width: 60%;
  background-color: ${(props) => props.theme.activityProject};
  border-radius: 4px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.text};
  margin-bottom: 10px;
  border: none;
`;

const Name = styled.h4`
  font-weight: 700;
  font-size: 16px;
`;

const Main = styled.div`
  display: flex;
  align-items: center;
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Dates = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
`;

const DateText = styled.span``;

const Button = styled.button`
  align-self: flex-end;
  border-radius: 20px;
  border: none;
  background-color: ${(props: any) => props.theme.activityProject};
  margin-bottom: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

const CancelIcon = styled(Cancel)`
  color: #eb5757;
  width: 30px;
`;

const ButtonAccess = styled.button`
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.text};
  color: ${(props) => props.theme.background};
`;
