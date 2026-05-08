import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { HiMenu, HiX, HiOutlineShoppingBag } from 'react-icons/hi';
import { selectCartTotalQuantity } from '../redux/cartSlice';
import useTranslation from '../hooks/useTranslation';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ onCartOpen }) => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const totalQuantity = useSelector(selectCartTotalQuantity);

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.inventory'), path: '/inventory' },
    { label: t('nav.cart'), path: '/cart' },
    { label: t('nav.settings'), path: '/settings' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-luxury-black/90 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center font-bold text-luxury-black text-lg group-hover:scale-105 transition-transform">
              LD
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-tight text-white">
                Luxe<span className="text-gold">Drive</span>
              </h1>
              <p className="text-[10px] text-white/30 tracking-[0.2em] uppercase">{t('nav.luxuryMotors')}</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wider uppercase transition-all duration-300 relative ${
                  location.pathname === link.path
                    ? 'text-gold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <button
              onClick={onCartOpen}
              className="relative p-2 text-white/60 hover:text-gold transition-colors"
              aria-label={t('nav.openCart')}
            >
              <HiOutlineShoppingBag size={22} />
              {totalQuantity > 0 && (
                <motion.span
                  key={totalQuantity}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 gold-gradient rounded-full text-[10px] font-bold flex items-center justify-center text-luxury-black"
                >
                  {totalQuantity}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
              aria-label={t('nav.toggleMenu')}
            >
              {isMobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-luxury-black/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`block py-3 text-sm tracking-wider uppercase transition-colors ${
                      location.pathname === link.path
                        ? 'text-gold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
