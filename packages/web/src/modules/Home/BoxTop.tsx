import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { InsertInvitation, AddBox, NoteAdd, Bookmark, Cancel } from '@styled-icons/material-rounded';
import Modal from 'styled-react-modal';
import { Link } from 'react-router-dom';

const BoxTop = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

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

      <ButtonAdd onClick={toggleModal}>
        Criar
        <AddBoxIcon />
      </ButtonAdd>

      <StyledModal isOpen={isOpen} onBackgroundClick={toggleModal} onEscapeKeydown={toggleModal}>
        <ButtonClose onClick={toggleModal}>
          <CancelIcon />
        </ButtonClose>
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
      </StyledModal>
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

const StyledModal = Modal.styled`
  width: 450px;
  height: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props: any) => props.theme.modalBackground};
  box-shadow: 0px 0px 1px ${(props: any) => props.theme.text};
  border-radius: 10px;
`;

const ButtonClose = styled.button`
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
