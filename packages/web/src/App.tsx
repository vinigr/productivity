import React from 'react';

import GlobalStyles from './styles/global';
import Routes from './routes';
import ThemeContextProvider from './contexts/ThemeProvider';

function App() {
  return (
    <ThemeContextProvider>
      <Routes />
      <GlobalStyles />
    </ThemeContextProvider>
  );
}

export default App;
