import React from 'react';
import { ModalProvider } from 'styled-react-modal';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import GlobalStyles from './styles/global';
import Routes from './routes';
import ThemeContextProvider from './contexts/ThemeProvider';

const App = () => {
  return (
    <ThemeContextProvider>
      <ModalProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DndProvider backend={HTML5Backend}>
            <Routes />
          </DndProvider>
        </MuiPickersUtilsProvider>
      </ModalProvider>
      <GlobalStyles />
    </ThemeContextProvider>
  );
};

export default App;
