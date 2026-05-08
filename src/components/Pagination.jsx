import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-gold hover:border-gold/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <HiChevronLeft size={18} />
      </button>

      {getPageNumbers().map((pageNum) => (
        <motion.button
          key={pageNum}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(pageNum)}
          className={`w-11 h-11 rounded-xl text-sm font-medium transition-all ${
            pageNum === currentPage
              ? 'btn-gold text-luxury-black'
              : 'bg-white/5 border border-white/10 text-white/60 hover:text-gold hover:border-gold/30'
          }`}
        >
          {pageNum}
        </motion.button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-gold hover:border-gold/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <HiChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
