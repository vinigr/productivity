import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { Wrapper, Form, Title, Label, Input, Options, LinkChangeAuth, ButtonAdd, ArrowIcon } from './styles';
import Loading from '../common/Loading';
import AuthService from '../../services/auth';
import api from '../../services/api';

const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async (e: any) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return toast('Por favor, preencha todos os campos!', { type: 'warning' });
    }

    setLoading(true);
    try {
      const { data } = await api.post('users', {
        username,
        email,
        password,
      });

      AuthService.setToken(data.token);

      setLoading(false);
      return navigate('/');
    } catch (error) {
      toast('Erro ao fazer login!', { type: 'error' });
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Form>
        <Title>Cadastro</Title>
        <Label>Usuário</Label>
        <Input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <Label>E-mail</Label>
        <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Label>Senha</Label>
        <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Options>
          <LinkChangeAuth to="/login">Fazer login</LinkChangeAuth>
          <ButtonAdd onClick={register}>
            Cadastrar
            <ArrowIcon />
          </ButtonAdd>
        </Options>
      </Form>
    </Wrapper>
  );
};

export default Register;
