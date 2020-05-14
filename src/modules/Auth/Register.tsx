import React from 'react';

import { Wrapper, Form, Title, Label, Input, Options, LinkChangeAuth, ButtonAdd, ArrowIcon } from './styles';

const Register = () => {
  return (
    <Wrapper>
      <Form>
        <Title>Cadastro</Title>
        <Label>Nome completo</Label>
        <Input type="text" required />
        <Label>E-mail</Label>
        <Input type="email" required />
        <Label>Senha</Label>
        <Input type="password" required />
        <Options>
          <LinkChangeAuth to="/login">Fazer login</LinkChangeAuth>
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
