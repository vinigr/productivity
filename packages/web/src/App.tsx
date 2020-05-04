import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/global';
import { light, dark } from './styles/theme';
import Routes from './routes';

function App() {
  return (
    <ThemeProvider theme={dark}>
      <Routes />
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
