import useTranslation from '../hooks/useTranslation';

const SortDropdown = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input-luxury px-4 py-3.5 text-sm cursor-pointer appearance-none min-w-[160px]"
      style={{ backgroundImage: 'none' }}
    >
      <option value="default" className="bg-luxury-dark">{t('inventory.sortDefault')}</option>
      <option value="price-asc" className="bg-luxury-dark">{t('inventory.sortPriceLow')}</option>
      <option value="price-desc" className="bg-luxury-dark">{t('inventory.sortPriceHigh')}</option>
      <option value="rating" className="bg-luxury-dark">{t('inventory.sortRating')}</option>
      <option value="horsepower" className="bg-luxury-dark">{t('inventory.sortPower')}</option>
      <option value="year" className="bg-luxury-dark">{t('inventory.sortNewest')}</option>
    </select>
  );
};

export default SortDropdown;
