import React from 'react';

import { Wrapper, Form, Title, Label, Input, Options, LinkChangeAuth, ButtonAdd, ArrowIcon } from './styles';

const Register = () => {
  return (
    <Wrapper>
      <Form>
        <Title>Cadastro</Title>
        <Label>Nome completo</Label>
        <Input type="text" />
        <Label>E-mail</Label>
        <Input type="email" />
        <Label>Senha</Label>
        <Input type="password" />
        <Options>
          <LinkChangeAuth to="login">Fazer login</LinkChangeAuth>
          <ButtonAdd>
            Cadastrar
            <ArrowIcon />
          </ButtonAdd>
        </Options>
      </Form>
    </Wrapper>
  );
};

export default Register;
