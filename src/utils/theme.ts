import type { Theme } from '../types/theme';

export const getStoredTheme = (): Theme | null => {
  const theme = localStorage.getItem('theme') as Theme | null;
  return theme && (theme === 'light' || theme === 'dark') ? theme : null;
};

export const storeTheme = (theme: Theme): void => {
  localStorage.setItem('theme', theme);
};

export const applyTheme = (theme: Theme): void => {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};