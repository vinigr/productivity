import React from 'react';
import { ModalProvider } from 'styled-react-modal';

import GlobalStyles from './styles/global';
import Routes from './routes';
import ThemeContextProvider from './contexts/ThemeProvider';

function App() {
  return (
    <ThemeContextProvider>
      <ModalProvider>
        <Routes />
      </ModalProvider>
      <GlobalStyles />
    </ThemeContextProvider>
  );
}

export default App;
