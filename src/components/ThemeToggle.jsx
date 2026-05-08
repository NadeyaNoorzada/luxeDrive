import { useSettings } from '../context/SettingsContext';

const ThemeToggle = () => {
  const { settings, dispatch } = useSettings();
  const isDark = settings.theme === 'dark';

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
      className="relative w-14 h-7 rounded-full flex items-center transition-all duration-500 cursor-pointer"
      style={{ background: isDark ? 'rgba(212,168,83,0.2)' : 'rgba(0,0,0,0.3)' }}
      aria-label="Toggle theme"
    >
      <div
        className={`absolute w-5 h-5 rounded-full transition-all duration-500 flex items-center justify-center text-xs ${
          isDark
            ? 'translate-x-1 bg-gold text-luxury-black'
            : 'translate-x-[calc(100%+2px)] bg-white text-gray-800'
        }`}
        style={{ transform: isDark ? 'translateX(4px)' : 'translateX(32px)' }}
      >
        {isDark ? '🌙' : '☀️'}
      </div>
    </button>
  );
};

export default ThemeToggle;
