import React, { useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Select, MenuItem } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import { Wrapper, Input, Label, TextArea, ButtonAdd } from './styles';

import api from '../../services/api';
import Loading from '../common/Loading';

const Form = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [scope, setScope] = useState<string>('work');
  const [initialDate, setInitialDate] = useState<Date | null>(new Date());
  const [finalDate, setFinalDate] = useState<Date | null>(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const registerProject = async (e: any) => {
    e.preventDefault();

    if (!name) {
      return enqueueSnackbar('O nome é obrigatório!', { variant: 'error' });
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
      <ButtonAdd onClick={registerProject}>Criar projeto</ButtonAdd>
    </Wrapper>
  );
};

export default Form;
