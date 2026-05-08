import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiArrowLeft, HiTrash, HiOutlineShoppingBag } from 'react-icons/hi';
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../redux/cartSlice';
import { formatPrice } from '../utils/helpers';
import useTranslation from '../hooks/useTranslation';
import EmptyState from '../components/EmptyState';

const CartPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const totalQuantity = useSelector(selectCartTotalQuantity);

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-28"
      >
        <EmptyState
          icon={HiOutlineShoppingBag}
          title={t('cart.emptyTitle')}
          description={t('cart.emptyDesc')}
          action={
            <Link to="/inventory" className="btn-gold px-6 py-3 text-sm">
              {t('cart.browseInventory')}
            </Link>
          }
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 pb-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/inventory"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-gold transition-colors mb-8"
        >
          <HiArrowLeft size={16} />
          {t('cart.continueShopping')}
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('cart.title')}</h1>
            <p className="text-white/30 text-sm mt-1">{totalQuantity} {t('cart.items')}</p>
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-sm text-white/30 hover:text-red-400 transition-colors flex items-center gap-2"
          >
            <HiTrash size={16} />
            {t('cart.clearAll')}
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="luxury-card p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/car/${item.id}`}
                  className="w-full sm:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        to={`/car/${item.id}`}
                        className="text-lg font-semibold text-white hover:text-gold transition-colors"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-white/40 mt-1">{item.brand}</p>
                    </div>
                    <p className="text-lg font-bold text-gradient whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-gold text-sm flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-sm text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-gold text-sm flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="p-2 text-white/30 hover:text-red-400 transition-colors"
                      >
                        <HiTrash size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-white/40">
                      {formatPrice(item.price)} {t('cart.each')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="luxury-card p-6 sm:p-8">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-white/40">{t('cart.subtotal')}</span>
              <span className="text-white">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">{t('cart.shipping')}</span>
              <span className="text-white/40">{t('cart.free')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/40">{t('cart.tax')}</span>
              <span className="text-white/40">{t('cart.calculatedAtCheckout')}</span>
            </div>
            <div className="border-t border-white/5 pt-3 flex justify-between">
              <span className="text-lg font-semibold text-white">{t('cart.total')}</span>
              <span className="text-2xl font-bold text-gradient">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
          <button className="btn-gold w-full py-4 text-base font-semibold">
            {t('cart.checkout')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;
