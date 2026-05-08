import { createContext, useContext, useReducer, useEffect } from 'react';
import settingsReducer from './settingsReducer';

const SettingsContext = createContext(null);

const getInitialSettings = () => {
  try {
    const saved = localStorage.getItem('luxedrive_settings');
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    theme: 'dark',
    layout: 'grid',
    language: 'en',
  };
};

export const SettingsProvider = ({ children }) => {
  const [settings, dispatch] = useReducer(settingsReducer, getInitialSettings());

  useEffect(() => {
    localStorage.setItem('luxedrive_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', settings.theme === 'light');
  }, [settings.theme]);

  return (
    <SettingsContext.Provider value={{ settings, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsContext;
