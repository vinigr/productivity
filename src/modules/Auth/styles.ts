import styled from 'styled-components';
import { PlayArrow } from '@styled-icons/material-rounded';
import { Link } from 'react-router-dom';

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.background};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: ${(props) => props.theme.titleBox};
  border-radius: 4px;
  padding: 20px;
`;

export const Title = styled.h1`
  font-weight: 700;
  color: ${(props) => props.theme.text};
  margin-bottom: 30px;
`;

export const Label = styled.label`
  color: ${(props) => props.theme.text};
  margin-bottom: 6px;
  font-size: 14px;
`;

export const Input = styled.input`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  color: ${(props) => props.theme.text};
  border: 1px solid #e0e0e0;
  padding: 8px 4px;
  width: 100%;
  margin-bottom: 14px;
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const LinkChangeAuth = styled(Link)`
  color: ${(props) => props.theme.text};
`;

export const ButtonAdd = styled.button`
  display: flex;
  align-items: center;
  border-radius: 2px;
  border: none;
  padding: 8px 10px;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.buttonBoxTop};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.8;
  }
`;

export const ArrowIcon = styled(PlayArrow)`
  color: ${(props) => props.theme.titleBoxRight};
  width: 16px;
  margin-left: 4px;
`;
