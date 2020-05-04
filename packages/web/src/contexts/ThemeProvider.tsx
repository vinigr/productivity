import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { light, dark } from '../styles/theme';

import ThemeContext from './ThemeContext';

const STORAGE_KEY = 'THEME';

type Props = {
  children: React.ReactNode;
};

const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    (() => {
      const data = localStorage.getItem(STORAGE_KEY);

      if (!data) {
        setTheme('dark');
        localStorage.setItem(STORAGE_KEY, 'dark');
      } else {
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

  return (
    <ThemeContext.Provider
      value={{
        theme,
        handleTheme,
      }}
    >
      <ThemeProvider theme={theme === 'light' ? light : dark}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
