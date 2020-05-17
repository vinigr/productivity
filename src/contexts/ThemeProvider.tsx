import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { ThemeProvider as ThemeMaterial } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';

import { SnackbarProvider } from 'notistack';

import { light, dark } from '../styles/theme';

import ThemeContext from './ThemeContext';

const STORAGE_KEY = 'THEME';

interface Props {
  children: React.ReactNode;
}

const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<'dark' | 'light'>();

  useEffect(() => {
    (() => {
      const data = localStorage.getItem(STORAGE_KEY);

      if (!data) {
        setTheme('dark');
        localStorage.setItem(STORAGE_KEY, 'dark');
      } else if (data === 'light' || data === 'dark') {
        setTheme(data);
      }
    })();
  }, [theme]);

  const handleTheme = () => {
    if (theme === 'light') {
      localStorage.setItem(STORAGE_KEY, 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem(STORAGE_KEY, 'light');
      setTheme('light');
    }
  };

  const materialtheme = createMuiTheme({
    palette: {
      type: theme,
    },
  });

  return (
    <ThemeContext.Provider
      value={{
        theme,
        handleTheme,
      }}
    >
      <ThemeProvider theme={theme === 'light' ? light : dark}>
        <ThemeMaterial theme={materialtheme}>
          <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>{children}</SnackbarProvider>
        </ThemeMaterial>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
