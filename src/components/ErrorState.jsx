import { motion } from 'framer-motion';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ErrorState = ({ message = 'Something went wrong.', onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
        <HiOutlineExclamationCircle className="text-red-400" size={40} />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Error</h3>
      <p className="text-white/50 max-w-md mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-ghost px-6 py-3 text-sm"
        >
          Try Again
        </button>
      )}
    </motion.div>
  );
};

export default ErrorState;
