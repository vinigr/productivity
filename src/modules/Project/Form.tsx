import React, { useState } from 'react';
import styled from 'styled-components';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Select, MenuItem } from '@material-ui/core';
import NewActivity from '../common/NewActivity';

const Form = () => {
  const [scope, setScope] = useState<string>('t');
  const [initialDate, setInitialDate] = useState<Date | null>(new Date());
  const [finalDate, setFinalDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <Label>Nome</Label>
      <Input />
      <Label>Descrição</Label>
      <TextArea />
      <Label>Escopo</Label>
      <Select
        variant="outlined"
        value={scope}
        onChange={(e: any) => setScope(e.target.value)}
        style={{ width: 200, marginBottom: 14 }}
      >
        <MenuItem value="t">Trabalho</MenuItem>
        <MenuItem value="e">Estudo</MenuItem>
        <MenuItem value="p">Pessoal</MenuItem>
      </Select>
      <Label>Data inicial</Label>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        format="dd/MM/yyyy"
        value={initialDate}
        InputAdornmentProps={{ position: 'end' }}
        onChange={setInitialDate}
        style={{ width: 200, marginBottom: 14 }}
      />
      <Label>Data final</Label>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        format="dd/MM/yyyy"
        value={finalDate}
        InputAdornmentProps={{ position: 'end' }}
        onChange={setFinalDate}
        style={{ width: 200, marginBottom: 14 }}
      />
      <Label>Atividades</Label>
      <ButtonAddActivity onClick={toggleModal}>Adicionar</ButtonAddActivity>
      <NewActivity isOpen={isOpen} toggleModal={toggleModal} />
    </Wrapper>
  );
};

export default Form;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 60%;
  margin-top: 60px;
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

const TextArea = styled.textarea`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.border};
  padding: 8px;
  height: 160px;
  margin-bottom: 14px;
  font-size: 18px;
  resize: none;
  border-radius: 4px;

  &:focus {
    border-color: ${(props) => props.theme.text};
  }
`;

const ButtonAddActivity = styled.button`
  border-radius: 2px;
  height: 42px;
  width: 240px;
  border: none;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.buttonBoxTop};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.8;
  }
`;
