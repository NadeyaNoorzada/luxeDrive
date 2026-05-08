import { motion } from 'framer-motion';
import { HiOutlineShoppingBag } from 'react-icons/hi';

const EmptyState = ({
  icon: Icon = HiOutlineShoppingBag,
  title = 'Nothing here yet',
  description = '',
  action,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="w-24 h-24 rounded-full bg-gold/5 flex items-center justify-center mb-6 border border-gold/10">
        <Icon className="text-gold/50" size={44} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      {description && (
        <p className="text-white/40 max-w-md mb-6">{description}</p>
      )}
      {action && action}
    </motion.div>
  );
};

export default EmptyState;
