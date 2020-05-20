import React, { useState, createContext, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import { useParams } from 'react-router';

import { ContainerTop, Title } from './styles';

import NewActivityModal from '../common/NewActivityModal';

import { IActivity } from '../../interfaces';

import List from './List';

import api from '../../services/api';

interface IList {
  title: string;
  creatable: boolean;
  cards: IActivity[];
}

const initialLists: IList[] = [
  {
    title: 'A fazer',
    creatable: true,
    cards: [],
  },
  {
    title: 'Fazendo',
    creatable: false,
    cards: [],
  },
  {
    title: 'Parado',
    creatable: false,
    cards: [],
  },
  {
    title: 'Pausado',
    creatable: false,
    cards: [],
  },
  { title: 'Concluído', creatable: false, cards: [] },
];

interface IContext {
  lists: IList[];
  move: (fromList: any, toList: any, from: any, to: any) => any;
}

export const BoardContext = createContext<IContext>({ lists: [], move: () => {} });

const Project = () => {
  const [lists, setLists] = useState<IList[]>(initialLists);
  const [isMovingCard, setIsMovingCard] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get(`projects/${params.id}/activities`);

      setLists(
        produce(lists, (draft) => {
          draft[0].cards = data.toDo.data;
          draft[1].cards = data.doing.data;
          draft[2].cards = data.stopped.data;
          draft[3].cards = data.paused.data;
          draft[4].cards = data.done.data;
        }),
      );
    } catch (error) {}
  };

  const addActivity = (activity: IActivity) => {
    setLists(
      produce(lists, (draft) => {
        draft[0].cards.push(activity);
      }),
    );
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

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
      if (index !== item?.listIndex) {
        saveChangeStatus(index, lists[item?.listIndex].cards[item?.index]);
      }

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
    setLists(
      produce(lists, (draft) => {
        const dragged = draft[fromList].cards[from];

        if (fromList !== toList) {
          setIsMovingCard(true);
          draft[fromList].cards.splice(from, 1);
          draft[toList].cards.splice(to, 0, dragged);
        }
      }),
    );
  };

  const saveChangeStatus = (listDropped: number, item: IActivity) => {
    console.log(lists[listDropped].title);
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
              {...(list.creatable && { toggleModal })}
              data={list}
            />
          ))}
        </Content>
      </Wrapper>
      <NewActivityModal isOpen={isOpen} toggleModal={toggleModal} addActivity={addActivity} />
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
