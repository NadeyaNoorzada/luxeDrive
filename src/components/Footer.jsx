import { Link } from 'react-router-dom';
import useTranslation from '../hooks/useTranslation';

const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = [
    {
      category: t('footer.explore'),
      links: [
        { label: t('nav.inventory'), path: '/inventory' },
        { label: t('footer.newArrivals'), path: '/inventory?sort=newest' },
        { label: t('footer.electric'), path: '/inventory?brand=tesla' },
        { label: t('footer.limitedEdition'), path: '/inventory?sort=price-desc' },
      ],
    },
    {
      category: t('footer.company'),
      links: [
        { label: t('footer.about'), path: '/about' },
        { label: t('footer.careers'), path: '/careers' },
        { label: t('footer.press'), path: '/press' },
        { label: t('footer.contact'), path: '/contact' },
      ],
    },
    {
      category: t('footer.support'),
      links: [
        { label: t('footer.faq'), path: '/faq' },
        { label: t('footer.shipping'), path: '/shipping' },
        { label: t('footer.returns'), path: '/returns' },
        { label: t('footer.warranty'), path: '/warranty' },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/5 bg-luxury-darker mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center font-bold text-luxury-black text-lg">
                LD
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Luxe<span className="text-gold">Drive</span>
                </h3>
              </div>
            </Link>
            <p className="text-white/30 text-sm leading-relaxed mb-6">
              The world's most exclusive luxury vehicle marketplace.
              Experience automotive excellence.
            </p>
            <div className="flex gap-3">
              {['T', 'I', 'F', 'Y'].map((letter, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs text-white/40 hover:text-gold hover:border-gold/30 transition-all cursor-pointer"
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.category}>
              <h4 className="text-xs text-white/40 uppercase tracking-wider mb-4">
                {section.category}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/50 hover:text-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} LuxeDrive. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-white/20 hover:text-white/40 transition-colors cursor-pointer">
              {t('footer.privacy')}
            </span>
            <span className="text-xs text-white/20 hover:text-white/40 transition-colors cursor-pointer">
              {t('footer.terms')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
