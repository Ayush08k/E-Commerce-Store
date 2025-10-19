import React from 'react';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="group relative bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col h-full animate-pulse">
      <div className="absolute top-2 right-2 z-10 p-2 bg-gray-300 rounded-full h-10 w-10"></div>
      <div className="block">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <div className="w-full h-full bg-gray-300"></div>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="flex items-center mt-2">
          <div className="h-5 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="h-10 bg-gray-300 rounded-lg w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
