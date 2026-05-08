import { motion } from 'framer-motion';
import ProductGrid from '../components/ProductGrid';
import { useCars } from '../hooks/useFetchCars';
import useTranslation from '../hooks/useTranslation';

const InventoryPage = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
            {t('inventory.browse')}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {t('inventory.title')}{' '}
            <span className="text-gradient">{t('inventory.titleAccent')}</span>
          </h1>
        </motion.div>
      </div>

      <ProductGrid
        useQueryHook={(page, limit) => useCars(page, limit)}
      />
    </motion.div>
  );
};

export default InventoryPage;
