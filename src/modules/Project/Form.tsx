import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { KeyboardDatePicker } from '@material-ui/pickers';
import { Select, MenuItem } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router';

import { Input, Label, TextArea, ButtonAdd } from './styles';

import api from '../../services/api';
import Loading from '../common/Loading';

interface IForm {
  edit?: boolean;
}

const Form = ({ edit }: IForm) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [scope, setScope] = useState<string>('work');
  const [initialDate, setInitialDate] = useState<Date | null>(new Date());
  const [finalDate, setFinalDate] = useState<Date | null>(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get(`projects/${params.id}`);

      setName(data.name);
      setDescription(data.description);
      setScope(data.scope);
      setInitialDate(data.initial_date);
      setFinalDate(data.final_date);
    } catch (error) {}
  };

  const registerProject = async (e: any) => {
    e.preventDefault();

    if (!name) {
      return enqueueSnackbar('O nome é obrigatório!', { variant: 'warning' });
    }

    setLoading(true);

    try {
      const { data } = await api.post('projects', {
        name,
        description,
        scope,
        initial_date: initialDate,
        final_date: finalDate,
      });

      enqueueSnackbar('Projeto criado com sucesso!', { variant: 'success' });
      setLoading(false);

      navigate(`/project/${data.id}`);
    } catch (error) {
      setLoading(false);

      enqueueSnackbar('Erro ao cadastrar projeto!', { variant: 'error' });
    }
  };

  const editProject = async (e: any) => {
    e.preventDefault();

    if (!name) {
      return enqueueSnackbar('O nome é obrigatório!', { variant: 'warning' });
    }

    if (!name) {
      return enqueueSnackbar('O nome é obrigatório!', { variant: 'warning' });
    }

    setLoading(true);

    try {
      const { data } = await api.put(`projects/${params.id}`, {
        name,
        description,
        scope,
        initial_date: initialDate,
        final_date: finalDate,
      });

      enqueueSnackbar('Projeto atualizado com sucesso!', { variant: 'success' });
      setLoading(false);

      navigate(`/project/${data.id}`);
    } catch (error) {
      setLoading(false);

      enqueueSnackbar('Erro ao atualizar projeto!', { variant: 'error' });
    }
  };

  const inactivateProject = async () => {
    const confirmInactivate = window.confirm('Tem certeza que deseja desativar este projeto?');

    if (!confirmInactivate) {
      return;
    }

    try {
      await api.put(`projects/${params.id}/inactive`);

      enqueueSnackbar('Projeto desativado com sucesso!', { variant: 'success' });
      setLoading(false);

      navigate(`/`);
    } catch (error) {
      setLoading(false);

      enqueueSnackbar('Erro ao desativar projeto!', { variant: 'error' });
    }
  };

  const deleteProject = async () => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este projeto?');

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`projects/${params.id}`);

      enqueueSnackbar('Projeto deletado com sucesso!', { variant: 'success' });
      setLoading(false);

      navigate(`/`);
    } catch (error) {
      setLoading(false);

      enqueueSnackbar('Erro ao deletar projeto!', { variant: 'error' });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Label>Nome</Label>
      <Input type="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Label>Descrição</Label>
      <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
      <Label>Escopo</Label>
      <Select
        variant="outlined"
        value={scope}
        onChange={(e: any) => setScope(e.target.value)}
        style={{ width: 200, marginBottom: 14 }}
      >
        <MenuItem value="work">Trabalho</MenuItem>
        <MenuItem value="study">Estudo</MenuItem>
        <MenuItem value="personal">Pessoal</MenuItem>
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
      {edit ? (
        <Options>
          <GroupOptions>
            <ButtonDelete onClick={() => deleteProject()}>Deletar</ButtonDelete>
            <ButtonInactive onClick={() => inactivateProject()}>Inativar</ButtonInactive>
          </GroupOptions>
          <ButtonAdd onClick={editProject}>Salvar projeto</ButtonAdd>
        </Options>
      ) : (
        <ButtonAdd onClick={registerProject}>Criar projeto</ButtonAdd>
      )}
    </Wrapper>
  );
};

export default Form;

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  margin-top: 60px;
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const GroupOptions = styled.div`
  display: flex;
`;

const ButtonCss = css`
  border-radius: 2px;
  height: 42px;
  width: 160px;
  border: none;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  margin: 0 6px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.8;
  }
`;

const ButtonDelete = styled.button`
  ${ButtonCss};
  background-color: #de0000;
`;

const ButtonInactive = styled.button`
  ${ButtonCss};
  background-color: #ec935d;
`;
