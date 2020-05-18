import React, { useState, createContext, useCallback } from 'react';
import styled from 'styled-components';
import produce from 'immer';

import { ContainerTop, Title } from './styles';

import { IActivity } from '../../interfaces';

import { loadLists } from './data';
import List from './List';

interface IList {
  title: string;
  creatable: boolean;
  cards: IActivity[];
}

const data = loadLists();

interface IContext {
  lists: IList[];
  move: (fromList: any, toList: any, from: any, to: any) => any;
}

export const BoardContext = createContext<IContext>({ lists: [], move: () => {} });

const Project = () => {
  const [lists, setLists] = useState<IList[]>(data);
  const [isMovingCard, setIsMovingCard] = useState(false);

  // const addActivityList = (activity: IActivity) => {
  //   setActivities([...activities, { ...activity }]);
  //   console.log(JSON.stringify(activity));
  // };

  // const deleteActivity = (id: number) => {
  //   const activityLocal = activities.find((activity) => activity.idLocal === id);

  //   if (activityLocal) {
  //     const newActivities = activities.filter((activity) => activity.idLocal && activity.idLocal !== 1);

  //     setActivities(newActivities);
  //   }

  //   console.log(id);
  // };

  // const accessActivity = (id: number) => {};

  const handleDrop = useCallback(
    (index, item) => {
      console.log(index);
      if (!isMovingCard) {
        setLists(
          produce(lists, (draft) => {
            const dragged = draft[item.listIndex].cards[item.index];
            draft[item.listIndex].cards.splice(item.index, 1);
            draft[index].cards.push(dragged);
          }),
        );
      } else {
        setIsMovingCard(false);
      }
    },
    [lists],
  );

  const move = (fromList: any, toList: any, from: any, to: any) => {
    console.log('teste');
    setLists(
      produce(lists, (draft) => {
        const dragged = draft[fromList].cards[from];
        setIsMovingCard(true);
        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      }),
    );
  };

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Wrapper>
        <ContainerTop>
          <Title>Projeto</Title>
        </ContainerTop>
        <Content>
          {lists.map((list, index): any => (
            <List
              accepts={['CARD']}
              onDrop={(item: any) => handleDrop(index, item)}
              key={`${list.title} - ${index}`}
              index={index}
              data={list}
            />
          ))}
        </Content>
      </Wrapper>
    </BoardContext.Provider>
  );
};

export default Project;

const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 1400px;
  margin-top: 60px;
  padding: 10px;

  overflow-y: hidden;
  overflow-x: scroll;
`;
