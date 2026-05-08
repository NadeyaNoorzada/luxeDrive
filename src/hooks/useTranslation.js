import { useSettings } from '../context/SettingsContext';
import translations from '../utils/translations';

const useTranslation = () => {
  const { settings } = useSettings();
  const lang = settings.language || 'en';
  const t = translations[lang] || translations.en;

  const translate = (path, params = {}) => {
    const keys = path.split('.');
    let result = t;
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        return path;
      }
    }
    if (typeof result === 'string') {
      return result.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? `{${key}}`);
    }
    return result;
  };

  return { t: translate, lang };
};

export default useTranslation;
