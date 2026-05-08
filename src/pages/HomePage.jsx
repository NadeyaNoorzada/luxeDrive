import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import CarCard from '../components/CarCard';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';
import { useCars } from '../hooks/useFetchCars';
import useTranslation from '../hooks/useTranslation';
import luxuryCars from '../data/luxuryCars';

const HomePage = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, error, refetch } = useCars(1, 6);

  const featuredCars = data?.cars?.slice(0, 6) || luxuryCars.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
            {t('featured.title')}
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('featured.heading')}{' '}
            <span className="text-gradient">{t('featured.headingAccent')}</span>
          </h2>
          <div className="w-20 h-0.5 bg-gold/50 mx-auto" />
        </motion.div>

        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : isError ? (
          <ErrorState message={error?.message} onRetry={refetch} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </div>
        )}
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-gold/5 to-luxury-black" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">
              {t('certification.title')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              {t('certification.subtitle')}{' '}
              <span className="text-gradient">{t('certification.subtitleAccent')}</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              {t('certification.description')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { label: t('certification.inspection'), desc: t('certification.inspectionDesc') },
                { label: t('certification.warranty'), desc: t('certification.warrantyDesc') },
                { label: t('certification.support'), desc: t('certification.supportDesc') },
              ].map((item) => (
                <div
                  key={item.label}
                  className="glass-light rounded-2xl p-6"
                >
                  <div className="text-2xl font-bold text-gradient mb-1">
                    {item.label}
                  </div>
                  <p className="text-white/40 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
