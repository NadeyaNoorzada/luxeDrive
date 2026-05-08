import useTranslation from '../hooks/useTranslation';

const FilterSidebar = ({ brands, selectedBrand, onBrandSelect, total }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-1">
          {t('inventory.filters')}
        </h3>
        <p className="text-xs text-white/30">{total} {t('inventory.vehiclesAvailable')}</p>
      </div>

      <div>
        <h4 className="text-xs text-white/40 uppercase tracking-wider mb-3">{t('inventory.brand')}</h4>
        <div className="space-y-1">
          <button
            onClick={() => onBrandSelect('')}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
              !selectedBrand
                ? 'bg-gold/10 text-gold border border-gold/20'
                : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            {t('inventory.allBrands')}
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => onBrandSelect(brand)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
                selectedBrand === brand
                  ? 'bg-gold/10 text-gold border border-gold/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
