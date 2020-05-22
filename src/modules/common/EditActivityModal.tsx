import React, { useState, useEffect } from 'react';
import Modal from 'styled-react-modal';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import styled from 'styled-components';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { Select, MenuItem } from '@material-ui/core';

import ButtonClose from './ButtonClose';

import api from '../../services/api';

import { IActivity } from '../../interfaces';

interface NewActivityProps {
  isOpen: boolean;
  toggleModal: () => any;
  activity: IActivity;
  editActivity: (activity: IActivity) => any;
  deleteActivity: (id: number) => any;
}

const EditActivityModal = ({ isOpen, toggleModal, activity, editActivity, deleteActivity }: NewActivityProps) => {
  const [name, setName] = useState<string>('');
  const [initialDate, setInitialDate] = useState<Date | null | string | undefined>(null);
  const [finalDate, setFinalDate] = useState<Date | null | string | undefined>(null);
  const [alertDate, setAlertDate] = useState<Date | null | string | undefined>(null);
  const [priority, setPriority] = useState<string>();

  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setName(activity.description);
    setInitialDate(activity?.initial_date);
    setFinalDate(activity?.final_date);
    setAlertDate(activity?.alert_date);
    setPriority(activity.priority);
  }, [activity]);

  const saveActivity = async () => {
    if (!name) {
      return enqueueSnackbar('O Nome é obrigatório!', { variant: 'warning' });
    }

    if (!initialDate) {
      return enqueueSnackbar('A data inicial é obrigatória!', { variant: 'warning' });
    }

    if (!priority) {
      return enqueueSnackbar('A priridade é obrigatória!', { variant: 'warning' });
    }

    if (!alertDate) {
      return enqueueSnackbar('Data de alerta é obrigatória!', { variant: 'warning' });
    }

    try {
      const { data } = await api.put(`projects/${params.id}/activities/${activity.id}`, {
        description: name,
        initial_date: initialDate,
        final_date: finalDate,
        alert_date: alertDate,
        priority,
      });

      enqueueSnackbar('Atividade atualizada com sucesso!', { variant: 'success' });

      editActivity(data);
      return toggleModal();
    } catch (error) {
      enqueueSnackbar('Erro ao editar atividade!', { variant: 'error' });
    }
  };

  return (
    <StyledModal isOpen={isOpen} onBackgroundClick={toggleModal} onEscapeKeydown={toggleModal}>
      <DivTop>
        <Title>Atividade</Title>
        <ButtonClose onClick={toggleModal} />
      </DivTop>
      <Form>
        <Label>Nome</Label>
        <Input type="name" value={name} onChange={(e) => setName(e.target.value)} />
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
        <Label>Prioridade</Label>
        <Select
          variant="outlined"
          value={priority}
          onChange={(e: any) => setPriority(e.target.value)}
          style={{ width: 200, marginBottom: 14 }}
        >
          <MenuItem value="low">Baixa</MenuItem>
          <MenuItem value="medium">Média</MenuItem>
          <MenuItem value="high">Alta</MenuItem>
        </Select>
        <Label>Data para alerta</Label>
        <KeyboardDateTimePicker
          autoOk
          variant="inline"
          inputVariant="outlined"
          format="dd/MM/yyyy HH:mm"
          value={alertDate}
          InputAdornmentProps={{ position: 'end' }}
          onChange={setAlertDate}
          style={{ width: 240, marginBottom: 14 }}
        />
      </Form>
      <Options>
        <ButtonDelete onClick={() => deleteActivity(activity.id)}>Deletar</ButtonDelete>
        <ButtonAdd onClick={saveActivity}>Salvar</ButtonAdd>
      </Options>
    </StyledModal>
  );
};

export default EditActivityModal;

const StyledModal = Modal.styled`
  width: 700px;
  height: 600px;
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

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 14px;
`;

const ButtonDelete = styled.button`
  border-radius: 2px;
  height: 42px;
  width: 160px;
  border: none;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  background-color: #de0000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.8;
  }
`;

const ButtonAdd = styled.button`
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
