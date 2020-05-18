import styled from 'styled-components';

export const ContainerTop = styled.div`
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

export const Title = styled.h2`
  font-weight: 700;
  font-size: 24px;
  color: ${(props) => props.theme.text};
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

export const TextArea = styled.textarea`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.border};
  padding: 8px;
  height: 160px;
  margin-bottom: 14px;
  font-size: 18px;
  resize: none;
  border-radius: 4px;
  width: 60%;

  &:focus {
    border-color: ${(props) => props.theme.text};
  }
`;

export const ButtonAddActivity = styled.button`
  border-radius: 2px;
  height: 42px;
  width: 240px;
  border: none;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 16px;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.buttonBoxTop};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.8;
  }
`;

export const ButtonAdd = styled.button`
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
