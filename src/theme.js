import React, { createContext, useContext, useState } from 'react';

export const darkTheme = {
  mode: 'dark',
  background: '#001339',
  cardBg: '#09214D',
  cardBgAlt: '#0E2A5E',
  surface: '#0A2554',
  text: '#FFFFFF',
  textSecondary: '#8B9EB7',
  textMuted: '#526987',
  border: '#16366D',
  primary: '#2969E3',
  primaryHover: '#1B56C7',
  accent: '#5BD8FF',
  highlight: '#FA6DB4',
  success: '#10B981',
  seatFree: '#1A396E',
  seatReserved: '#09204A',
  seatSelected: '#5BD8FF',
  white: '#FFFFFF',
  black: '#000000',
};

export const brightTheme = {
  mode: 'bright',
  background: '#024EE0',
  cardBg: '#FFFFFF',
  cardBgAlt: '#F5F7FC',
  surface: '#EBF1FD',
  text: '#172B4D',
  textSecondary: '#5E6C84',
  textMuted: '#8993A4',
  border: '#DFE1E6',
  primary: '#024EE0',
  primaryHover: '#003BB0',
  accent: '#007AFF',
  highlight: '#FA6DB4',
  success: '#10B981',
  seatFree: '#E2E8F0',
  seatReserved: '#CBD5E1',
  seatSelected: '#024EE0',
  white: '#FFFFFF',
  black: '#000000',
};

const ThemeContext = createContext({
  theme: darkTheme,
  toggleTheme: () => {},
  setMode: () => {},
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(prev => !prev);
  const setMode = (mode) => setIsDark(mode === 'dark');

  const theme = isDark ? darkTheme : brightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
