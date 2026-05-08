import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineShoppingBag, HiCheck, HiStar } from 'react-icons/hi';
import { addToCart, selectCartItems } from '../redux/cartSlice';
import { formatPrice, truncateText } from '../utils/helpers';
import useTranslation from '../hooks/useTranslation';
import { useToast } from './ToastProvider';

const CarCard = ({ car, index = 0 }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { addToast } = useToast();
  const inCart = cartItems.some((item) => item.id === car.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(car));
    addToast(t('toast.addedToCart', { title: car.title }), 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Link
        to={`/car/${car.id}`}
        className="luxury-card group block overflow-hidden h-full"
      >
        <div className="relative overflow-hidden aspect-[16/10]">
          <motion.img
            src={car.thumbnail}
            alt={car.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider bg-gold/20 text-gold border border-gold/30 rounded-lg backdrop-blur-sm">
              {car.brand}
            </span>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1.5 bg-luxury-black/60 backdrop-blur-sm rounded-lg border border-white/5">
            <HiStar className="text-gold" size={14} />
            <span className="text-xs text-white/90">{car.rating}</span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-gold transition-colors">
            {car.title}
          </h3>
          <p className="text-white/40 text-sm mb-3 line-clamp-2">
            {truncateText(car.description, 80)}
          </p>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="text-[11px] text-white/50 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              {car.year}
            </div>
            <div className="text-[11px] text-white/50 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              {car.horsepower} HP
            </div>
            <div className="text-[11px] text-white/50 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
              {car.transmission}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div>
              <span className="text-2xl font-bold text-gradient">
                {formatPrice(car.price)}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className={`p-3 rounded-xl transition-all duration-300 ${
                inCart
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'btn-gold text-luxury-black'
              }`}
              aria-label={inCart ? t('car.inCart') : t('car.addToCart')}
            >
              {inCart ? <HiCheck size={18} /> : <HiOutlineShoppingBag size={18} />}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CarCard;
