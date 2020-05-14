import React from 'react';
import { ModalProvider } from 'styled-react-modal';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import GlobalStyles from './styles/global';
import Routes from './routes';
import ThemeContextProvider from './contexts/ThemeProvider';

const App = () => {
  toast.configure({ autoClose: 2000 });

  return (
    <ThemeContextProvider>
      <ModalProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Routes />
        </MuiPickersUtilsProvider>
      </ModalProvider>
      <GlobalStyles />
      <ToastContainer />
    </ThemeContextProvider>
  );
};

export default App;
