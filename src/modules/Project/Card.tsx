import React, { useContext, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Edit } from '@styled-icons/material-rounded';
import { format } from 'date-fns';

import { useDrag, useDrop } from 'react-dnd';

import { IActivity } from '../../interfaces';
import { BoardContext } from './Project';

interface ICard {
  data: IActivity;
  index: number;
  listIndex: number;
  openModalEdit: (activity: IActivity, listIndex: number) => any;
}

const Card = ({ data, index, listIndex, openModalEdit }: ICard) => {
  const ref = useRef<any>();
  const { move } = useContext(BoardContext);

  let memTime = 0;
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: any, monitor: any) {
      var date = new Date();
      var now = date.getTime();
      if (memTime == 0) memTime = now;
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }
      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }
      if (now - memTime >= 300 || draggedListIndex == targetListIndex) {
        move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);
        item.index = targetIndex;
        item.listIndex = targetListIndex;
        memTime = 0;
      }
    },
  });

  dragRef(dropRef(ref));

  return (
    <Wrapper ref={ref} isDragging={isDragging}>
      <DivTop>
        <div>
          <Name>{data.description}</Name>
        </div>
        <ButtonAdd onClick={() => openModalEdit(data, listIndex)}>
          <EditIcon />
        </ButtonAdd>
      </DivTop>
      <Term>Prazo: {data.final_date && format(new Date(data.final_date), 'dd/LL HH:mm')}</Term>
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.li<{ isDragging: any }>`
  background-color: ${(props) => props.theme.itemList};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 8px;
  cursor: grab;
  position: relative;

  ${(props) =>
    props.isDragging &&
    css`
      border: 2px dashed ${(props) => props.theme.text};
      padding-top: 31px;
      border-radius: 0;
      background: transparent;
      box-shadow: none;
      cursor: grabbing;
      p,
      img,
      header {
        opacity: 0;
      }
    `}
`;

const DivTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Name = styled.h2`
  font-weight: 600;
  font-size: 18px;
  color: ${(props) => props.theme.titleItemList};
  margin-bottom: 4px;
`;

const ButtonAdd = styled.button`
  border: none;
  background-color: transparent;
`;

const EditIcon = styled(Edit)`
  color: ${(props) => props.theme.titleBoxRight};
  width: 20px;
`;

const DivBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Term = styled.h4`
  font-weight: 300;
  font-size: 12px;
  color: ${(props) => props.theme.text};
`;
