import React from 'react';

interface ProductFilterProps {
  types: string[];
  maxPrice: number;
  selectedTypes: string[];
  currentPrice: number;
  onTypeChange: (types: string[]) => void;
  onPriceChange: (price: number) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  types,
  maxPrice,
  selectedTypes,
  currentPrice,
  onTypeChange,
  onPriceChange,
}) => {

  const handleTypeToggle = (type: string) => {
    const newSelectedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    onTypeChange(newSelectedTypes);
  };
  
  const handleReset = () => {
    onTypeChange([]);
    onPriceChange(maxPrice);
  };
  
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
      <h3 className="text-2xl font-serif font-bold mb-4">Filters</h3>
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold mb-3 text-gray-800">Product Type</h4>
          <div className="space-y-2">
            {types.map(type => (
              <label key={type} className="flex items-center cursor-pointer text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                />
                <span className="ml-3 text-gray-700">{capitalize(type)}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="border-t pt-6">
          <h4 className="font-semibold mb-2 text-gray-800">Price</h4>
          <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
            Up to: <span className="font-bold text-indigo-600">${Math.round(currentPrice)}</span>
          </label>
          <input
            id="priceRange"
            type="range"
            min="0"
            max={maxPrice}
            value={currentPrice}
            onChange={e => onPriceChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
            style={{accentColor: 'rgb(79 70 229)'}}
          />
        </div>
      </div>
      <button 
        onClick={handleReset}
        className="mt-8 w-full bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default ProductFilter;
