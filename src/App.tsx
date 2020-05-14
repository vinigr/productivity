import React from 'react';
import { ModalProvider } from 'styled-react-modal';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import GlobalStyles from './styles/global';
import Routes from './routes';
import ThemeContextProvider from './contexts/ThemeProvider';

function App() {
  return (
    <ThemeContextProvider>
      <ModalProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Routes />
        </MuiPickersUtilsProvider>
      </ModalProvider>
      <GlobalStyles />
    </ThemeContextProvider>
  );
}

export default App;
