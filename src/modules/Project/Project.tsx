import React, { useState, createContext, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import produce from 'immer';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';

import { ContainerTop, Title } from './styles';

import NewActivityModal from '../common/NewActivityModal';

import { IActivity } from '../../interfaces';

import List from './List';

import api from '../../services/api';
import EditActivityModal from '../common/EditActivityModal';

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

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [activityEdit, setActivityEdit] = useState<IActivity | null>();
  const [indexListEdit, setIndexListEdit] = useState<number | null>();

  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();

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
    setIndexListEdit(null);
  };

  const openModalEdit = (activity: IActivity, listIndex: number) => {
    setActivityEdit(activity);
    setIsOpenEdit(true);
    setIndexListEdit(listIndex);
  };

  const closeModalEdit = () => {
    setIsOpenEdit(false);
    setIndexListEdit(null);
    setActivityEdit(null);
  };

  const saveEditActivity = (activity: IActivity) => {
    if (indexListEdit === undefined || indexListEdit === null) {
      return;
    }

    setLists(
      produce(lists, (draft) => {
        const index = draft[indexListEdit!].cards.findIndex((item) => item.id === activity.id);
        console.log(index);
        draft[indexListEdit!].cards[index] = activity;
      }),
    );

    setIndexListEdit(null);
    setActivityEdit(null);
  };

  const deleteActivity = async (id: number) => {
    setIsOpenEdit(false);

    try {
      await api.delete(`projects/${params.id}/activities/${id}`);

      enqueueSnackbar('Atividade deletada com sucesso!', { variant: 'success' });

      setLists(
        produce(lists, (draft) => {
          const index = draft[indexListEdit!].cards.findIndex((item) => item.id === id);

          draft[indexListEdit!].cards.splice(index, 1);
        }),
      );
    } catch (error) {
      enqueueSnackbar('Erro ao deletar atividade!', { variant: 'error' });
    }
  };

  const handleDrop = useCallback(
    async (index, item) => {
      if (index === item?.listIndex) {
        return;
      }

      saveChangeStatus(index, item);
    },
    [lists],
  );

  const saveChangeStatus = async (index: number, item: any) => {
    if ((index === 2 && item?.listIndex === 3) || (index === 3 && item?.listIndex === 2)) {
      return;
    }

    if ((index === 2 || index === 3) && item?.listIndex === 4) {
      return;
    }

    if (index === 1 && item?.listIndex === 0) {
      return await saveStartActivity(item);
    }

    if (index === 2 || index === 3) {
      return await saveInterruption(item, index);
    }

    if (index === 1 && (item?.listIndex === 2 || item?.listIndex === 3)) {
      return await saveFinishInterruption(item);
    }

    if ((item?.listIndex === 0 || item?.listIndex === 1) && index === 4) {
      return await saveFinishActivity(item);
    }
  };

  const saveListChange = (index: number, item: any) => {
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
  };

  const saveStartActivity = async (item: any) => {
    const { id } = lists[item.listIndex].cards[item.index];

    try {
      await api.put(`projects/${params.id}/activities/${id}/start`);

      saveListChange(1, item);
      enqueueSnackbar('Atividade iniciada com sucesso!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao iniciar atividade!', { variant: 'error' });
      return;
    }
  };

  const saveInterruption = async (item: any, index: number) => {
    const { id } = lists[item.listIndex].cards[item.index];

    const typePtBr = index === 2 ? 'parada' : 'pausa';

    const reason = prompt(`Qual o motivo da ${typePtBr}?`);

    const type = index === 2 ? 'stop' : 'pause';

    try {
      await api.post(`projects/${params.id}/activities/${id}/interruptions`, {
        description: reason,
        type,
      });

      saveListChange(index, item);
      enqueueSnackbar('Interrupção salva com sucesso!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao salvar interrupção!', { variant: 'error' });
      return;
    }
  };

  const saveFinishInterruption = async (item: any) => {
    const { id } = lists[item.listIndex].cards[item.index];

    try {
      await api.put(`projects/${params.id}/activities/${id}/interruptions/finish`);

      saveListChange(1, item);
      enqueueSnackbar('Status alterado com sucesso!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao salvar alteração do status!', { variant: 'error' });
      return;
    }
  };

  const saveFinishActivity = async (item: any) => {
    const { id } = lists[item.listIndex].cards[item.index];

    try {
      await api.put(`projects/${params.id}/activities/${id}/finish`);

      saveListChange(4, item);
      enqueueSnackbar('Atividade finalizada com sucesso!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao finalizar atividade!', { variant: 'error' });
      return;
    }
  };

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
              openModalEdit={openModalEdit}
            />
          ))}
        </Content>
      </Wrapper>
      <NewActivityModal isOpen={isOpen} toggleModal={toggleModal} addActivity={addActivity} />
      {activityEdit && (
        <EditActivityModal
          isOpen={isOpenEdit}
          toggleModal={closeModalEdit}
          activity={activityEdit}
          editActivity={saveEditActivity}
          deleteActivity={deleteActivity}
        />
      )}
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
