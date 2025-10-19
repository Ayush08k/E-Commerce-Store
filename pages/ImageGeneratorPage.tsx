import React, { useState, useCallback } from 'react';
import { ALL_PRODUCTS } from '../constants';
import { Product } from '../types';
import { generateProductImage } from '../services/geminiService';
import Spinner from '../components/Spinner';

interface ProductState extends Product {
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

const ImageGeneratorPage: React.FC = () => {
  const [products, setProducts] = useState<ProductState[]>(
    ALL_PRODUCTS.map(p => ({ ...p, generatedImage: null, isLoading: false, error: null }))
  );

  const handleGenerateImage = useCallback(async (productId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, isLoading: true, error: null, generatedImage: null } : p));
    
    const product = ALL_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    try {
      const imageUrl = await generateProductImage(product.name, product.description);
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, isLoading: false, generatedImage: imageUrl } : p));
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, isLoading: false, error: errorMessage } : p));
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-4xl font-serif font-bold text-center mb-10">AI Product Image Generator</h1>
      <p className="text-center text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
        This is an internal tool to generate new, high-quality images for our products using AI. Click 'Generate New Image' for any product to create a new visual asset.
      </p>
      
      <div className="space-y-8">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 w-full md:w-1/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-center mb-2 text-gray-700">Current Image</h4>
                <img src={product.image} alt={`Current: ${product.name}`} className="w-full h-auto object-cover rounded-md aspect-square" />
              </div>
              <div className="relative">
                <h4 className="font-semibold text-center mb-2 text-gray-700">Generated Image</h4>
                <div className="w-full h-auto bg-gray-100 rounded-md aspect-square flex items-center justify-center">
                  {product.isLoading && <Spinner />}
                  {!product.isLoading && product.generatedImage && (
                    <img src={product.generatedImage} alt={`Generated: ${product.name}`} className="w-full h-full object-cover rounded-md" />
                  )}
                  {!product.isLoading && !product.generatedImage && (
                    <div className="text-center text-gray-500 p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="mt-2 block text-sm">No image generated yet.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-grow">
              <h2 className="text-2xl font-bold font-serif text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              {product.error && (
                <p className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">
                  <strong>Error:</strong> {product.error}
                </p>
              )}
              <div className="mt-4">
                <button
                  onClick={() => handleGenerateImage(product.id)}
                  disabled={product.isLoading}
                  className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
                >
                  {product.isLoading ? 'Generating...' : 'Generate New Image'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGeneratorPage;