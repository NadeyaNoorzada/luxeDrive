import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineX, HiOutlineShoppingBag, HiTrash } from 'react-icons/hi';
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
import EmptyState from './EmptyState';

const CartDrawer = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const totalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-luxury-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-luxury-dark border-l border-white/5 z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
              <h2 className="text-lg font-semibold text-white">{t('cart.title')}</h2>
        <p className="text-xs text-white/30">{totalQuantity} {t('cart.items')}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-white/40 hover:text-white transition-colors rounded-xl hover:bg-white/5"
              >
                <HiOutlineX size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <EmptyState
                  icon={HiOutlineShoppingBag}
                  title={t('cart.emptyTitle')}
                  description={t('cart.emptyDesc')}
                  action={
                    <Link
                      to="/inventory"
                      onClick={onClose}
                    className="btn-gold px-6 py-3 text-sm"
                  >
                    {t('cart.browseInventory')}
                    </Link>
                  }
                />
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 glass-light rounded-2xl p-4"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/car/${item.id}`}
                          onClick={onClose}
                          className="text-sm font-medium text-white hover:text-gold transition-colors line-clamp-1"
                        >
                          {item.title}
                        </Link>
                        <p className="text-gold text-sm font-semibold mt-1">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => dispatch(decreaseQuantity(item.id))}
                              className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-gold text-sm flex items-center justify-center transition-colors"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-sm text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => dispatch(increaseQuantity(item.id))}
                              className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-gold text-sm flex items-center justify-center transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="ml-auto p-1.5 text-white/30 hover:text-red-400 transition-colors"
                          >
                            <HiTrash size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-white/5 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">{t('cart.subtotal')}</span>
                    <span className="text-lg font-bold text-white">{formatPrice(totalPrice)}</span>
                  </div>
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="w-full py-3 text-sm text-white/40 hover:text-red-400 transition-colors"
                  >
                    {t('cart.clearCart')}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
