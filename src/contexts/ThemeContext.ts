import { createContext } from 'react';

interface ContextProps {
  theme?: string;
  handleTheme: () => any;
}

const ThemeContext = createContext<ContextProps | null>(null);

export default ThemeContext;
