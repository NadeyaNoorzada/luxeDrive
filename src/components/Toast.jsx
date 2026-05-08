import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX } from 'react-icons/hi';

const Toast = ({ messages, onRemove }) => {
  return (
    <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className={`pointer-events-auto glass-light rounded-xl px-5 py-4 flex items-start gap-3 shadow-2xl border ${
              msg.type === 'success'
                ? 'border-green-500/30'
                : msg.type === 'error'
                ? 'border-red-500/30'
                : 'border-gold/30'
            }`}
          >
            <span className="text-sm flex-1 text-white/90">{msg.text}</span>
            <button
              onClick={() => onRemove(msg.id)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <HiOutlineX size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
