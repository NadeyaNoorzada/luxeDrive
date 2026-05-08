import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineAdjustments, HiOutlineX } from 'react-icons/hi';
import CarCard from './CarCard';
import SkeletonLoader from './SkeletonLoader';
import ErrorState from './ErrorState';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import FilterSidebar from './FilterSidebar';
import { useSettings } from '../context/SettingsContext';
import useTranslation from '../hooks/useTranslation';

const ProductGrid = ({ useQueryHook }) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { settings } = useSettings();
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortBy, setSortBy] = useState('default');
  const [filterBrand, setFilterBrand] = useState(searchParams.get('brand') || '');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const limit = 12;

  const queryResult = useQueryHook(page, limit);
  const { data, isLoading, isError, error, refetch } = queryResult;

  useEffect(() => {
    const params = {};
    if (page > 1) params.page = page;
    if (searchQuery) params.q = searchQuery;
    if (filterBrand) params.brand = filterBrand;
    setSearchParams(params, { replace: true });
  }, [page, searchQuery, filterBrand, setSearchParams]);

  let cars = data?.cars || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  if (filterBrand) {
    cars = cars.filter(
      (c) => c.brand.toLowerCase() === filterBrand.toLowerCase()
    );
  }

  if (sortBy === 'price-asc') {
    cars = [...cars].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    cars = [...cars].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    cars = [...cars].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'horsepower') {
    cars = [...cars].sort((a, b) => b.horsepower - a.horsepower);
  } else if (sortBy === 'year') {
    cars = [...cars].sort((a, b) => b.year - a.year);
  }

  const filteredBrands = [...new Set((data?.cars || []).map((c) => c.brand))].sort();

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleBrandFilter = (brand) => {
    setFilterBrand(brand);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar
            brands={filteredBrands}
            selectedBrand={filterBrand}
            onBrandSelect={handleBrandFilter}
            total={total}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="flex-1 w-full">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <SortDropdown value={sortBy} onChange={setSortBy} />
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-3.5 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-gold hover:border-gold/30 transition-all"
              >
                <HiOutlineAdjustments size={20} />
              </button>
            </div>
          </div>

          {searchQuery && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/40 text-sm mb-6"
            >
              {t('inventory.showingResults')} "{searchQuery}"
              {filterBrand && ` ${t('inventory.inBrand')} ${filterBrand}`}
              {' '}&mdash; {total} {total === 1 ? t('inventory.vehicle') : t('inventory.vehicles')} {t('inventory.found')}
            </motion.p>
          )}

          {filterBrand && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-white/40">{t('inventory.brand')}:</span>
              <span className="px-3 py-1 text-xs bg-gold/10 text-gold rounded-lg border border-gold/20">
                {filterBrand}
              </span>
              <button
                onClick={() => handleBrandFilter('')}
                className="text-white/30 hover:text-white transition-colors"
              >
                <HiOutlineX size={16} />
              </button>
            </div>
          )}

          {isLoading ? (
            <SkeletonLoader count={6} />
          ) : isError ? (
            <ErrorState
              message={error?.message || 'Failed to load vehicles.'}
              onRetry={refetch}
            />
          ) : cars.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🏎️</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t('inventory.noVehicles')}
              </h3>
              <p className="text-white/40">
                {t('inventory.noVehiclesDesc')}
              </p>
            </motion.div>
          ) : (
            <>
              <div
                className={`grid gap-6 ${
                  settings.layout === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {cars.map((car, i) => (
                  <CarCard key={car.id} car={car} index={i} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-luxury-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute right-0 top-0 bottom-0 w-80 bg-luxury-dark border-l border-white/5 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Filters</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <HiOutlineX size={24} />
              </button>
            </div>
            <FilterSidebar
              brands={filteredBrands}
              selectedBrand={filterBrand}
              onBrandSelect={(brand) => {
                handleBrandFilter(brand);
                setSidebarOpen(false);
              }}
              total={total}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
