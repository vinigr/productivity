import React from 'react';
import styled from 'styled-components';
import { Cancel } from '@styled-icons/material-rounded';

interface ButtonProps {
  onClick: () => any;
}

const ButtonClose = ({ onClick }: ButtonProps) => {
  return (
    <Wrapper onClick={onClick}>
      <CancelIcon />
    </Wrapper>
  );
};

export default ButtonClose;

const Wrapper = styled.button`
  align-self: flex-end;
  border-radius: 20px;
  border: none;
  background-color: ${(props: any) => props.theme.modalBackground};
  margin: 10px;

  &:hover {
    opacity: 0.8;
  }
`;

const CancelIcon = styled(Cancel)`
  color: #eb5757;
  width: 30px;
`;
