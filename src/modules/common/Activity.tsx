import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { Edit } from '@styled-icons/material-rounded';

import { IActivity } from '../../interfaces';

const Activity = ({ activity: { id, description, final_date } }: { activity: IActivity }) => {
  return (
    <Wrapper>
      <DivTop>
        <div>
          <Name>{description}</Name>
          <NameProject>Teste</NameProject>
        </div>
        <ButtonAdd>
          <EditIcon />
        </ButtonAdd>
      </DivTop>

      <DivBottom>
        <Term>Prazo: {final_date && format(new Date(final_date), 'dd/LL HH:mm')}</Term>
        <ButtonComplete>Concluir</ButtonComplete>
      </DivBottom>
    </Wrapper>
  );
};

export default Activity;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.itemList};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 8px;
`;

const DivTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Name = styled.h2`
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => props.theme.titleItemList};
  margin-bottom: 4px;
`;

const NameProject = styled.h3`
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.text};
`;

const ButtonAdd = styled.button`
  border: none;
  background-color: transparent;
`;

const EditIcon = styled(Edit)`
  color: ${(props) => props.theme.titleBoxRight};
  width: 20px;
`;

const DivBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Term = styled.h4`
  font-weight: 300;
  font-size: 12px;
  color: ${(props) => props.theme.text};
`;

const ButtonComplete = styled.button`
  border: none;
  background: #07922e;
  border-radius: 4px;
  color: #fff;
  padding: 10px;

  &:hover {
    opacity: 0.8;
  }
`;
