import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from './styles/global';
import { light, dark } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyles />
    </ThemeProvider>
  );
}

export default App;
