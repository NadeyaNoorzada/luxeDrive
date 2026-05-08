import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { HiArrowLeft, HiOutlineShoppingBag, HiCheck, HiStar } from 'react-icons/hi';
import { addToCart, selectCartItems } from '../redux/cartSlice';
import { formatPrice } from '../utils/helpers';
import { useCarById } from '../hooks/useFetchCars';
import useTranslation from '../hooks/useTranslation';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorState from '../components/ErrorState';
import { useToast } from '../components/ToastProvider';

const CarDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { addToast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);

  const specs = [
    { label: t('car.specs.horsepower'), key: 'horsepower', suffix: ' HP' },
    { label: t('car.specs.topSpeed'), key: 'topSpeed', suffix: ' mph' },
    { label: t('car.specs.acceleration'), key: 'acceleration', suffix: 's' },
    { label: t('car.specs.transmission'), key: 'transmission', suffix: '' },
    { label: t('car.specs.fuelType'), key: 'fuelType', suffix: '' },
    { label: t('car.specs.year'), key: 'year', suffix: '' },
  ];

  const { data: car, isLoading, isError, error, refetch } = useCarById(id);

  if (isLoading) return <SkeletonLoader type="detail" />;

  if (isError) {
    return (
      <div className="pt-28">
        <ErrorState message={error?.message || 'Vehicle not found'} onRetry={refetch} />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="pt-28">
        <ErrorState message="Vehicle not found" />
      </div>
    );
  }

  const inCart = cartItems.some((item) => item.id === car.id);
  const images = car.images?.length > 0 ? car.images : [car.thumbnail];

  const handleAddToCart = () => {
    dispatch(addToCart(car));
    addToast(t('toast.addedToCart', { title: car.title }), 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/inventory"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-gold transition-colors mb-8"
        >
          <HiArrowLeft size={16} />
          {t('car.backToInventory')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4 luxury-card">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={images[selectedImage]}
                alt={car.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/40 via-transparent to-transparent" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      i === selectedImage
                        ? 'border-gold opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 rounded-lg">
                {car.brand}
              </span>
              <span className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider bg-white/5 text-white/60 border border-white/10 rounded-lg">
                {car.year}
              </span>
              {car.stock <= 3 && car.stock > 0 && (
                <span className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg">
                  {t('car.onlyLeft', { stock: car.stock })}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              {car.title}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar
                    key={i}
                    size={16}
                    className={i < Math.round(car.rating) ? 'text-gold' : 'text-white/10'}
                  />
                ))}
              </div>
              <span className="text-sm text-white/40">{car.rating}</span>
            </div>

            <p className="text-white/50 leading-relaxed mb-8">
              {car.description}
            </p>

            <div className="text-4xl font-bold text-gradient mb-8">
              {formatPrice(car.price)}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {specs.map((spec) => (
                <div
                  key={spec.key}
                  className="glass-light rounded-xl p-4"
                >
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">
                    {spec.label}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {car[spec.key]}{spec.suffix}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                disabled={inCart}
                className={`flex-1 min-w-[200px] px-8 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 transition-all ${
                  inCart
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
                    : 'btn-gold text-luxury-black hover:shadow-xl'
                }`}
              >
                {inCart ? (
                  <>
                    <HiCheck size={20} />
                    {t('car.inCart')}
                  </>
                ) : (
                  <>
                    <HiOutlineShoppingBag size={20} />
                    {t('car.addToCart')}
                  </>
                )}
              </button>
              <Link
                to="/cart"
                className="btn-ghost px-8 py-4 text-base"
              >
                {t('car.viewCart')}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarDetailsPage;
