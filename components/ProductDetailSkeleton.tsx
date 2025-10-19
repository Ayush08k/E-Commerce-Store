import React from 'react';

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse animate-slideInRight">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-6"></div> {/* Breadcrumbs */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8">
          {/* --- LEFT COLUMN: IMAGE GALLERY --- */}
          <div className="lg:col-span-5">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div> {/* Title */}
            <div className="flex gap-4">
              <div className="flex flex-col space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-16 h-16 bg-gray-300 rounded-md"></div>
                ))}
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-300 rounded-lg aspect-[1/1]"></div>
              </div>
            </div>
          </div>

          {/* --- MIDDLE COLUMN: PRODUCT INFO --- */}
          <div className="lg:col-span-4 mt-6 lg:mt-0">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div> {/* Title */}
            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-3"></div>
            <div className="flex items-center gap-4 mb-3">
              <div className="h-5 bg-gray-300 rounded w-24"></div>
              <div className="h-5 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
            <hr className="my-4"/>
            <div className="space-y-2">
              <div className="h-10 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
            <div className="my-4">
              <div className="h-5 bg-gray-300 rounded w-1/4 mb-2"></div>
              <div className="grid grid-cols-3 gap-2">
                <div className="border p-2 rounded-md h-16 bg-gray-300"></div>
                <div className="border p-2 rounded-md h-16 bg-gray-300"></div>
                <div className="border p-2 rounded-md h-16 bg-gray-300"></div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: ACTION PANEL --- */}
          <div className="lg:col-span-3 mt-6 lg:mt-0">
            <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div> {/* Title */}
            <div className="border rounded-lg p-4 shadow-sm">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="mt-4 flex flex-col gap-3">
                <div className="h-10 w-full bg-gray-300 rounded-full"></div>
                <div className="h-10 w-full bg-gray-300 rounded-full"></div>
              </div>
              <div className="mt-3 h-10 w-full bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;