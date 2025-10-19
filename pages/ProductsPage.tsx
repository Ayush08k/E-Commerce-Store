
import React, { useState, useMemo } from 'react';
import { ALL_PRODUCTS } from '../constants';
import ProductGrid from '../components/ProductGrid';
import ProductFilter from '../components/ProductFilter';

const ProductsPage: React.FC = () => {
  const productTypes = useMemo(() => [...new Set(ALL_PRODUCTS.map(p => p.productType))], []);
  const maxPrice = useMemo(() => Math.ceil(Math.max(...ALL_PRODUCTS.map(p => p.price))), []);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceLimit, setPriceLimit] = useState<number>(maxPrice);

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.productType);
      const priceMatch = product.price <= priceLimit;
      return typeMatch && priceMatch;
    });
  }, [selectedTypes, priceLimit]);

  // Reset price limit when the component mounts or maxPrice changes
  React.useEffect(() => {
    setPriceLimit(maxPrice);
  }, [maxPrice]);
  
  return (
    <div className="flex flex-col md:flex-row gap-10 animate-fadeIn">
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <ProductFilter 
          types={productTypes}
          maxPrice={maxPrice}
          selectedTypes={selectedTypes}
          currentPrice={priceLimit}
          onTypeChange={setSelectedTypes}
          onPriceChange={setPriceLimit}
        />
      </aside>
      <div className="w-full md:w-3/4 lg:w-4/5">
        <h1 className="text-4xl font-serif font-bold text-center mb-10">Our Entire Collection</h1>
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;