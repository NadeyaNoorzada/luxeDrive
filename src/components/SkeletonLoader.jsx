const SkeletonLoader = ({ type = 'card', count = 6 }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="luxury-card overflow-hidden">
            <div className="shimmer h-52 w-full" />
            <div className="p-5 space-y-3">
              <div className="shimmer h-5 w-3/4 rounded" />
              <div className="shimmer h-4 w-1/2 rounded" />
              <div className="shimmer h-4 w-full rounded" />
              <div className="flex justify-between items-center pt-2">
                <div className="shimmer h-6 w-24 rounded" />
                <div className="shimmer h-9 w-28 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="shimmer h-8 w-64 mb-8 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="shimmer h-96 rounded-2xl" />
          <div className="space-y-4">
            <div className="shimmer h-10 w-3/4 rounded" />
            <div className="shimmer h-6 w-1/3 rounded" />
            <div className="shimmer h-24 w-full rounded" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="shimmer h-16 rounded-xl" />
              ))}
            </div>
            <div className="shimmer h-12 w-48 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SkeletonLoader;
