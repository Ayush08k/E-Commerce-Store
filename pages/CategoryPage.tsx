import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ALL_PRODUCTS } from '../constants';
import ProductGrid from '../components/ProductGrid';
import ProductFilter from '../components/ProductFilter';
import Breadcrumbs from '../components/Breadcrumbs';

const CategoryPage: React.FC = () => {
  const { demographic } = useParams<{ demographic: 'women' | 'men' | 'girl' | 'boy' }>();

  const categoryProducts = useMemo(() => {
    if (!demographic) return [];
    return ALL_PRODUCTS.filter(p => p.demographic === demographic);
  }, [demographic]);

  const productTypes = useMemo(() => [...new Set(categoryProducts.map(p => p.productType))], [categoryProducts]);
  const maxPrice = useMemo(() => {
    if (categoryProducts.length === 0) return 0;
    return Math.ceil(Math.max(...categoryProducts.map(p => p.price)));
  }, [categoryProducts]);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceLimit, setPriceLimit] = useState<number>(maxPrice);

  // Reset filters when the demographic (category) changes
  useEffect(() => {
    setPriceLimit(maxPrice);
    setSelectedTypes([]);
  }, [demographic, maxPrice]);

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(product => {
      const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.productType);
      const priceMatch = product.price <= priceLimit;
      return typeMatch && priceMatch;
    });
  }, [categoryProducts, selectedTypes, priceLimit]);
  
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const title = demographic ? `${capitalize(demographic)}'s Collection` : 'Collection';

  if (!demographic) {
    return <p className="text-center text-xl text-gray-500">Category not found.</p>;
  }

  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: capitalize(demographic) }
  ];
  
  return (
    <div className="animate-fadeIn">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex flex-col md:flex-row gap-10">
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
          <h1 className="text-4xl font-serif font-bold text-center mb-10">{title}</h1>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
