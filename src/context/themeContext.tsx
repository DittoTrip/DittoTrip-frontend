import { ReactNode, createContext, useEffect, useState } from 'react';
import { ThemeName, getTheme } from '../styles/theme';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/global';

const DEFAULT_THEME_NAME = 'light';
const THEME_LOVALSTORAGE_KEY = 'ditto_theme';
interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}
export const state = {
  themeName: 'light' as ThemeName,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<State>(state);

export const DittoProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('light');

  useEffect(() => {
    const savedThemeName = localStorage.getItem(THEME_LOVALSTORAGE_KEY) as ThemeName;

    setThemeName(savedThemeName || DEFAULT_THEME_NAME);
  }, []);

  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
    localStorage.setItem(THEME_LOVALSTORAGE_KEY, themeName === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
