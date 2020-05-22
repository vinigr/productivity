import React from 'react';
import styled from 'styled-components';
import { AddBox } from '@styled-icons/material-rounded';

import { DropTarget } from 'react-dnd';

import Card from './Card';

import { IActivity } from '../../interfaces';

interface IList {
  data: {
    title: string;
    creatable: boolean;
    cards: IActivity[];
  };
  index: number;
  accepts: string[];
  connectDropTarget: any;
  onDrop: any;
  toggleModal?: () => any;
  openModalEdit: (activity: IActivity, listIndex: number) => any;
}

const List = ({ data, index: listIndex, connectDropTarget, toggleModal, openModalEdit }: IList) => {
  return connectDropTarget(
    <div>
      <Wrapper>
        <Header>
          <Title>{data.title}</Title>
          {data.creatable && (
            <ButtonAdd onClick={toggleModal}>
              <AddBoxIcon />
            </ButtonAdd>
          )}
        </Header>
        <ul>
          {data.cards.map((card, index) => (
            <Card key={card.id} listIndex={listIndex} index={index} data={card} openModalEdit={openModalEdit} />
          ))}
        </ul>
      </Wrapper>
    </div>,
  );
};

export default DropTarget(
  (props: any) => props.accepts,
  {
    drop(props, monitor) {
      props.onDrop(monitor.getItem());
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }),
)(List);

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.titleBox};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  min-width: 260px;
  margin-right: 20px;
  height: 100%;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 20px;
  color: ${(props) => props.theme.text};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ButtonAdd = styled.button`
  border: none;
  background-color: transparent;
`;

const AddBoxIcon = styled(AddBox)`
  color: ${(props) => props.theme.titleBoxRight};
  width: 30px;
`;
