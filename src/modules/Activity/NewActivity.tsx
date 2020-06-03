import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { Select, MenuItem } from '@material-ui/core';

import { useSnackbar } from 'notistack';

import api from '../../services/api';

import { IProject } from '../../interfaces';

const NewActivity = () => {
  const [projects, setProjects] = useState<IProject[]>([]);

  const [project, setProject] = useState();

  const [name, setName] = useState<string>('');
  const [initialDate, setInitialDate] = useState<Date | null>(new Date());
  const [finalDate, setFinalDate] = useState<Date | null>(null);
  const [alertDate, setAlertDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<string>('low');

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data.data);
    } catch (error) {}
  };

  const saveActivity = async (e: any) => {
    e.preventDefault();
    if (!name) {
      return enqueueSnackbar('O Nome é obrigatório!', { variant: 'warning' });
    }

    if (!project) {
      return enqueueSnackbar('O projeto não foi informado!', { variant: 'warning' });
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
      await api.post(`projects/${project}/activities`, {
        description: name,
        initial_date: initialDate,
        final_date: finalDate,
        alert_date: alertDate,
        priority,
      });

      enqueueSnackbar('Atividade cadastrada com sucesso!', { variant: 'success' });

      setName('');
      setProject(undefined);
      setInitialDate(new Date());
      setFinalDate(null);
      setPriority('low');
      setAlertDate(null);
    } catch (error) {
      enqueueSnackbar('Erro ao cadastrar atividade!', { variant: 'error' });
    }
  };

  return (
    <Wrapper>
      <DivTop>
        <Title>Nova Atividade</Title>
      </DivTop>
      <Form>
        <Label>Nome</Label>
        <Input type="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Label>Projeto</Label>
        <Select
          variant="outlined"
          value={project}
          onChange={(e: any) => setProject(e.target.value)}
          style={{ width: 200, marginBottom: 14 }}
        >
          {projects.map((project) => (
            <MenuItem value={project.id}>{project.name}</MenuItem>
          ))}
        </Select>
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
        <ButtonAdd onClick={saveActivity}>Adicionar</ButtonAdd>
      </Form>
    </Wrapper>
  );
};

export default NewActivity;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DivTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${(props) => props.theme.titleBox};
  height: 60px;
  border-radius: 0px 0px 4px 4px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: calc(100% - 330px);
  z-index: 10;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  width: 100%;
  margin-top: 60px;
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
  width: 60%;

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
