import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import { Wrapper, Form, Title, Label, Input, Options, LinkChangeAuth, ButtonAdd, ArrowIcon } from './styles';
import Loading from '../common/Loading';
import api from '../../services/api';
import AuthService from '../../services/auth';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      return toast('Por favor, preencha todos os campos!', { type: 'warning' });
    }

    setLoading(true);
    try {
      const { data } = await api.post('login', {
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
        <Title>Login</Title>
        <Label>E-mail</Label>
        <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <Label>Senha</Label>
        <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Options>
          <LinkChangeAuth to="/register">Cadastrar-se</LinkChangeAuth>
          <ButtonAdd onClick={login}>
            Entrar
            <ArrowIcon />
          </ButtonAdd>
        </Options>
      </Form>
    </Wrapper>
  );
};

export default Login;
