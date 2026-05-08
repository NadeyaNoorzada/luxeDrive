import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import useTranslation from '../hooks/useTranslation';
import { HiOutlineSun, HiOutlineMoon, HiOutlineViewGrid, HiOutlineViewList, HiOutlineGlobe } from 'react-icons/hi';

const SettingsPage = () => {
  const { settings, dispatch } = useSettings();
  const { t } = useTranslation();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
    { code: 'it', label: 'Italiano' },
    { code: 'fa', label: 'فارسی' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 pb-16"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
            {t('settings.subtitle')}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {t('settings.title')}
          </h1>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="luxury-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                {settings.theme === 'dark' ? (
                  <HiOutlineMoon className="text-gold" size={24} />
                ) : (
                  <HiOutlineSun className="text-gold" size={24} />
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{t('settings.theme')}</h2>
                <p className="text-sm text-white/40">
                  {t('settings.themeDesc')} {settings.theme === 'dark' ? t('settings.darkMode') : t('settings.lightMode')}
                </p>
              </div>
            </div>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
              className={`relative w-full py-4 rounded-xl text-sm font-semibold transition-all ${
                settings.theme === 'dark'
                  ? 'bg-white/5 text-white border border-white/10 hover:border-gold/30'
                  : 'btn-gold text-luxury-black'
              }`}
            >
              {settings.theme === 'dark' ? t('settings.switchToLight') : t('settings.switchToDark')}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="luxury-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                {settings.layout === 'grid' ? (
                  <HiOutlineViewGrid className="text-gold" size={24} />
                ) : (
                  <HiOutlineViewList className="text-gold" size={24} />
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{t('settings.layout')}</h2>
                <p className="text-sm text-white/40">
                  {t('settings.layoutDesc')} {settings.layout === 'grid' ? t('settings.gridView') : t('settings.listView')}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => dispatch({ type: 'SET_LAYOUT', payload: 'grid' })}
                className={`py-4 rounded-xl text-sm font-semibold transition-all ${
                  settings.layout === 'grid'
                    ? 'btn-gold text-luxury-black'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:text-gold hover:border-gold/30'
                }`}
              >
                <HiOutlineViewGrid className="inline mr-2" size={18} />
                {t('settings.grid')}
              </button>
              <button
                onClick={() => dispatch({ type: 'SET_LAYOUT', payload: 'list' })}
                className={`py-4 rounded-xl text-sm font-semibold transition-all ${
                  settings.layout === 'list'
                    ? 'btn-gold text-luxury-black'
                    : 'bg-white/5 text-white/60 border border-white/10 hover:text-gold hover:border-gold/30'
                }`}
              >
                <HiOutlineViewList className="inline mr-2" size={18} />
                {t('settings.list')}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="luxury-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <HiOutlineGlobe className="text-gold" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{t('settings.language')}</h2>
                <p className="text-sm text-white/40">
                  {t('settings.languageDesc')} {languages.find((l) => l.code === settings.language)?.label || 'English'}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() =>
                    dispatch({ type: 'SET_LANGUAGE', payload: lang.code })
                  }
                  className={`py-3 rounded-xl text-sm font-medium transition-all ${
                    settings.language === lang.code
                      ? 'btn-gold text-luxury-black'
                      : 'bg-white/5 text-white/60 border border-white/10 hover:text-gold hover:border-gold/30'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
