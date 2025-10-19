import React, { useState, useEffect } from 'react';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { Product } from '../types';
import ProductCard from './ProductCard';

const RecentlyViewed: React.FC = () => {
  const { getRecentlyViewedProducts } = useRecentlyViewed();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getRecentlyViewedProducts());
  }, [getRecentlyViewedProducts]);

  // Don't render the section if there are no recently viewed products
  if (products.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-4xl font-serif font-bold text-center mb-10">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-slideInUp" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
