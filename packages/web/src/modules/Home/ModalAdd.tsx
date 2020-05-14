import React from 'react';
import styled from 'styled-components';

import { NoteAdd, Bookmark } from '@styled-icons/material-rounded';
import Modal from 'styled-react-modal';
import { Link } from 'react-router-dom';
import ButtonClose from '../common/ButtonClose';

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => any;
}

const ModalAdd = ({ isOpen, toggleModal }: ModalProps) => {
  return (
    <Wrapper isOpen={isOpen} onBackgroundClick={toggleModal} onEscapeKeydown={toggleModal}>
      <ButtonClose onClick={toggleModal} />
      <TitleModal>Criar</TitleModal>
      <Links>
        <LinkModal to="/new-project">
          <TextLink>Projeto</TextLink>
          <NoteIcon />
        </LinkModal>
        <LinkModal to="/new-task">
          <TextLink>Atividade</TextLink>
          <BookmarkIcon />
        </LinkModal>
      </Links>
    </Wrapper>
  );
};

export default ModalAdd;

const Wrapper = Modal.styled`
  width: 450px;
  height: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props: any) => props.theme.modalBackground};
  box-shadow: 0px 0px 1px ${(props: any) => props.theme.text};
  border-radius: 10px;
`;

const TitleModal = styled.h3`
  color: ${(props) => props.theme.text};
  margin-bottom: 30px;
`;

const Links = styled.div`
  display: flex;
  width: 300px;
  justify-content: space-around;
`;

const LinkModal = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${(props) => props.theme.linkModal};
  height: 100px;
  width: 100px;
  text-decoration: none;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: ${(props) => props.theme.contentLinkModal};

  &:hover {
    opacity: 0.8;
  }
`;

const TextLink = styled.h4`
  font-size: 18px;
  font-weight: 600;
`;

const NoteIcon = styled(NoteAdd)`
  width: 36px;
`;

const BookmarkIcon = styled(Bookmark)`
  width: 36px;
`;
