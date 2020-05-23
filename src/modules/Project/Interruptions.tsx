import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Edit } from '@styled-icons/material-rounded';

import { Link, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import produce from 'immer';

import { ContainerTop } from './styles';

import { format } from 'date-fns';
import formatDistanceStrict from 'date-fns/esm/formatDistanceStrict';
import pt from 'date-fns/locale/pt-BR';

import api from '../../services/api';

const Interruptions = () => {
  const [stops, setStops] = useState<any[]>();
  const [pauses, setPauses] = useState<any[]>();

  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await api.get(`projects/${params.id}/interruptions`);

      setStops(data.data.filter((interruption: any) => interruption.type === 'stop'));
      setPauses(data.data.filter((interruption: any) => interruption.type === 'pause'));
    } catch (error) {}
  };

  const endInterruption = async (id: number, index: number, type: string) => {
    try {
      const { data } = await api.put(`projects/${params.id}/activities/${id}/interruptions/finish`);

      if (type === 'stop') {
        setStops(
          produce(stops, (draft) => {
            draft![index] = data;
          }),
        );
      } else {
        setPauses(
          produce(stops, (draft) => {
            draft![index] = data;
          }),
        );
      }

      enqueueSnackbar('Interrupção finalizada com sucesso!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Erro ao finalizar interrupção!', { variant: 'error' });
    }
  };

  return (
    <Wrapper>
      <ContainerTop>
        <LinkTop to={`/project/${params.id}`}>Projeto</LinkTop>
        <Options>
          <LinkOption to={`/project/${params.id}/interruptions`}>Interrupções</LinkOption>
          <LinkOption to={`/project/${params.id}/edit`}>
            <EditIcon />
          </LinkOption>
        </Options>
      </ContainerTop>
      <Content>
        <SectionInterruption>
          <TitleSectionInterruption>Paradas</TitleSectionInterruption>
          {!!stops &&
            stops.map((stop, index) => (
              <CardInterruption key={stop.id}>
                <DescriptionInterruption>{stop.description}</DescriptionInterruption>
                <DateInterruption>
                  {format(new Date(stop.initial_date), 'dd/MM | HH:mm')} -{' '}
                  {stop.final_date && format(new Date(stop.final_date), 'dd/MM | HH:mm')}
                </DateInterruption>
                {stop.final_date && (
                  <TimeInterruption>
                    Parada de{' '}
                    {formatDistanceStrict(new Date(stop.final_date), new Date(stop.initial_date), { locale: pt })}
                  </TimeInterruption>
                )}
                {!stop.final_date && (
                  <EndInterruption onClick={() => endInterruption(stop.activity_id, index, 'stop')}>
                    Encerrar
                  </EndInterruption>
                )}
              </CardInterruption>
            ))}
        </SectionInterruption>
        <SectionInterruption>
          <TitleSectionInterruption>Pausas</TitleSectionInterruption>
          {!!pauses &&
            pauses.map((pause, index) => (
              <CardInterruption key={pause.id}>
                <DescriptionInterruption>{pause.description}</DescriptionInterruption>
                <DateInterruption>
                  {format(new Date(pause.initial_date), 'dd/MM | HH:mm')} -{' '}
                  {pause.final_date && format(new Date(pause.final_date), 'dd/MM | HH:mm')}
                </DateInterruption>
                {pause.final_date && (
                  <TimeInterruption>
                    Pausa de{' '}
                    {formatDistanceStrict(new Date(pause.final_date), new Date(pause.initial_date), { locale: pt })}
                  </TimeInterruption>
                )}
                {!pause.final_date && (
                  <EndInterruption onClick={() => endInterruption(pause.activity_id, index, 'pause')}>
                    Encerrar
                  </EndInterruption>
                )}
              </CardInterruption>
            ))}
        </SectionInterruption>
      </Content>
    </Wrapper>
  );
};

export default Interruptions;

const Wrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);
  background-color: ${(props) => props.theme.background};
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  margin-top: 60px;
  padding: 10px;
  width: 100%;
`;

const LinkTop = styled(Link)`
  font-weight: 700;
  font-size: 24px;
  color: ${(props) => props.theme.text};
  text-decoration: none;
`;

const Options = styled.div`
  display: flex;
`;

const LinkOption = styled(Link)`
  font-size: 18px;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  margin: 0 10px;
`;

const EditIcon = styled(Edit)`
  color: ${(props) => props.theme.titleBoxRight};
  width: 20px;
`;

const SectionInterruption = styled.section`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const TitleSectionInterruption = styled.h3`
  font-size: 22px;
  color: ${(props) => props.theme.text};
  margin-bottom: 14px;
`;

const CardInterruption = styled.div`
  background-color: ${(props) => props.theme.modalBackground};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 8px;
  width: 300px;
`;

const DescriptionInterruption = styled.h4`
  color: ${(props) => props.theme.titleItemList};
  margin-bottom: 8px;
`;

const DateInterruption = styled.h5`
  color: ${(props) => props.theme.titleItemList};
  opacity: 0.9;
  margin-bottom: 6px;
`;

const TimeInterruption = styled.h6`
  color: ${(props) => props.theme.titleItemList};
  opacity: 0.8;
  font-size: 12px;
`;

const EndInterruption = styled.button`
  align-self: flex-end;
  border-radius: 2px;
  border: none;
  padding: 4px 8px;
  font-weight: 600;
  font-size: 14px;
  color: ${(props) => props.theme.background};
  background-color: ${(props) => props.theme.text};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    opacity: 0.8;
  }
`;
