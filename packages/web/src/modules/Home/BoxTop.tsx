import React from 'react';
import styled, { css } from 'styled-components';
import { InsertInvitation, AddBox } from '@styled-icons/material-rounded';

const BoxTop = () => {
  return (
    <Wrapper>
      <Dates>
        <ButtonDate>
          <TextDate active>Hoje</TextDate>
        </ButtonDate>
        <ButtonDate>
          <TextDate>Amanhã</TextDate>
        </ButtonDate>
        <ButtonDate>
          <InvitationIcon />
        </ButtonDate>
      </Dates>

      <ButtonAdd>
        Criar
        <AddBoxIcon />
      </ButtonAdd>
    </Wrapper>
  );
};

export default BoxTop;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${(props) => props.theme.titleBox};
  height: 60px;
  border-radius: 0px 0px 4px 4px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
`;

const Dates = styled.div`
  display: flex;
`;

const ButtonDate = styled.button`
  border: none;
  background-color: transparent;
  margin-right: 40px;
`;

const TextDate = styled.h2<{ active?: boolean }>`
  ${(props) => (props.active ? DateActive : DateNotActive)}
`;

const DateActive = css`
  font-weight: 700;
  font-size: 24px;
  color: ${(props) => props.theme.text};
`;

const DateNotActive = css`
  font-weight: 500;
  color: #9a9a9a;
  font-size: 18px;
`;

const InvitationIcon = styled(InsertInvitation)`
  color: #9a9a9a;
  width: 22px;
`;

const ButtonAdd = styled.button`
  border-radius: 2px;
  border: none;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.buttonBoxTop};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
`;

const AddBoxIcon = styled(AddBox)`
  color: ${(props) => props.theme.text};
  margin-left: 4px;
  width: 24px;
`;
