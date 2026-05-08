import { useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { debounce } from '../utils/helpers';
import useTranslation from '../hooks/useTranslation';

const SearchBar = ({ onSearch }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const debouncedSearch = debounce((query) => {
    onSearch(query);
  }, 400);

  const handleChange = (e) => {
    const query = e.target.value;
    setValue(query);
    debouncedSearch(query);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={t('inventory.search')}
        className="input-luxury w-full pl-12 pr-4 py-3.5 text-sm"
      />
    </form>
  );
};

export default SearchBar;
