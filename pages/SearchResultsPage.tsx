import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPersonalizedSearchResults } from '../services/geminiService';
import { Product } from '../types';
import { ALL_PRODUCTS } from '../constants';
import ProductGrid from '../components/ProductGrid';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductGridSkeleton from '../components/ProductGridSkeleton';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const searchResults = await getPersonalizedSearchResults(query, ALL_PRODUCTS);
        setResults(searchResults);
      } catch (err) {
        setError('Sorry, we couldn\'t fetch personalized results. Please try another search.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Search Results' }
  ];

  return (
    <div className="animate-fadeIn">
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-4xl font-serif font-bold text-center mb-4">Search Results</h1>
      {query && <p className="text-center text-lg text-gray-600 mb-10">Showing personalized results for: <span className="font-semibold text-indigo-600">"{query}"</span></p>}
      
      {loading && <ProductGridSkeleton count={8} />}
      
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      {!loading && !error && (
        <ProductGrid products={results} />
      )}
    </div>
  );
};

export default SearchResultsPage;
