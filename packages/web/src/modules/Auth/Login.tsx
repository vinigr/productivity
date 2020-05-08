import React from 'react';

import { Wrapper, Form, Title, Label, Input, Options, LinkChangeAuth, ButtonAdd, ArrowIcon } from './styles';

const Login = () => {
  return (
    <Wrapper>
      <Form>
        <Title>Login</Title>
        <Label>E-mail</Label>
        <Input type="email" />
        <Label>Senha</Label>
        <Input type="password" />
        <Options>
          <LinkChangeAuth to="register">Cadastrar-se</LinkChangeAuth>
          <ButtonAdd>
            Entrar
            <ArrowIcon />
          </ButtonAdd>
        </Options>
      </Form>
    </Wrapper>
  );
};

export default Login;
