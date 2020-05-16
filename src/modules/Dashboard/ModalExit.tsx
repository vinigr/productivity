import React from 'react';
import Modal from 'styled-react-modal';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import ButtonClose from '../common/ButtonClose';

import AuthService from '../../services/auth';

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => any;
}

const ModalExit = ({ isOpen, toggleModal }: ModalProps) => {
  const navigate = useNavigate();

  const logout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <Wrapper isOpen={isOpen} onBackgroundClick={toggleModal} onEscapeKeydown={toggleModal}>
      <ButtonClose onClick={toggleModal} />
      <TitleModal>Tem certeza que deseja sair?</TitleModal>
      <Buttons>
        <Button onClick={logout} background="#45ae43">
          Sim
        </Button>
        <Button onClick={toggleModal} background="#AE4343">
          Não
        </Button>
      </Buttons>
    </Wrapper>
  );
};

export default ModalExit;

const Wrapper = Modal.styled`
  width: 360px;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props: any) => props.theme.modalBackground};
  box-shadow: 0px 0px 1px ${(props: any) => props.theme.text};
  border-radius: 10px;
`;

const TitleModal = styled.h3`
  color: ${(props) => props.theme.text};
  text-align: center;
  font-size: 20px;
  margin: 20px 0 40px;
`;

const Buttons = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
`;

const Button = styled.button<{ background: string }>`
  border-radius: 2px;
  height: 42px;
  width: 80px;
  border: none;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  background-color: ${(props) => props.background};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.8;
  }
`;
