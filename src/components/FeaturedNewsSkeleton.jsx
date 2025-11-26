const FeaturedNewsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:aspect-2/1">
      {/* Main Story Skeleton */}
      <div className="lg:col-span-2 relative h-96 lg:h-auto overflow-hidden rounded-2xl shadow-xl bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="bg-gray-300 h-5 w-24 rounded mb-4"></div>
            <div className="bg-gray-300 h-8 w-3/4 rounded mb-3"></div>
            <div className="bg-gray-300 h-8 w-1/2 rounded mb-4"></div>
            <div className="bg-gray-300 h-4 w-full rounded mb-2"></div>
            <div className="bg-gray-300 h-4 w-5/6 rounded mb-6"></div>
          </div>
        </div>
      </div>

      {/* Side Stories Skeleton */}
      <div className="flex flex-col gap-6 h-full">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex-1 relative overflow-hidden rounded-xl shadow-md bg-gray-200 animate-pulse"
          >
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="bg-gray-300 h-4 w-20 rounded mb-2"></div>
              <div className="bg-gray-300 h-5 w-full rounded mb-2"></div>
              <div className="bg-gray-300 h-5 w-2/3 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedNewsSkeleton;
