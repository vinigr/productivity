import React, { useState } from 'react';
import Modal from 'styled-react-modal';
import ButtonClose from './ButtonClose';
import styled from 'styled-components';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

interface NewActivityProps {
  isOpen: boolean;
  toggleModal: () => any;
}

const NewActivity = ({ isOpen, toggleModal }: NewActivityProps) => {
  const [initialDate, setInitialDate] = useState<Date | null>(new Date());
  const [finalDate, setFinalDate] = useState<Date | null>(new Date());

  return (
    <StyledModal isOpen={isOpen} onBackgroundClick={toggleModal} onEscapeKeydown={toggleModal}>
      <DivTop>
        <Title>Atividade</Title>
        <ButtonClose onClick={toggleModal} />
      </DivTop>
      <Form>
        <Label>Nome</Label>
        <Input />
        <Label>Data inicial</Label>
        <KeyboardDateTimePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          format="dd/MM/yyyy HH:mm"
          value={initialDate}
          InputAdornmentProps={{ position: 'end' }}
          onChange={setInitialDate}
          style={{ width: 240, marginBottom: 14 }}
        />
        <Label>Data final</Label>
        <KeyboardDateTimePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          format="dd/MM/yyyy HH:mm"
          value={finalDate}
          InputAdornmentProps={{ position: 'end' }}
          onChange={setFinalDate}
          style={{ width: 240, marginBottom: 14 }}
        />
      </Form>
      <ButtonAdd>Adicionar</ButtonAdd>
    </StyledModal>
  );
};

export default NewActivity;

const StyledModal = Modal.styled`
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: ${(props: any) => props.theme.modalBackground};
  box-shadow: 0px 0px 1px ${(props: any) => props.theme.text};
  border-radius: 10px;
`;

const DivTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-left: 14px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  width: 60%;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.text};
  font-size: 22px;
`;

const Label = styled.label`
  color: ${(props) => props.theme.text};
  margin-bottom: 6px;
  font-size: 14px;
`;

const Input = styled.input`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.border};
  padding: 8px;
  height: 40px;
  margin-bottom: 14px;
  font-size: 18px;
  border-radius: 4px;

  &:focus {
    border-color: ${(props) => props.theme.text};
  }
`;

const ButtonAdd = styled.button`
  align-self: flex-end;
  margin-right: 10px;
  border-radius: 2px;
  height: 42px;
  width: 160px;
  border: none;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => props.theme.background};
  background-color: ${(props) => props.theme.text};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.8;
  }
`;
