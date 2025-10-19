import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import ConfirmationModal from '../components/ConfirmationModal';

const WishlistPage: React.FC = () => {
  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToRemove, setProductToRemove] = useState<Product | null>(null);

  const handleMoveToCart = (product: Product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };
  
  const handleRemoveClick = (product: Product) => {
    setProductToRemove(product);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (productToRemove) {
      removeFromWishlist(productToRemove.id);
    }
  };

  if (wishlistCount === 0) {
    return (
      <div className="text-center py-20 animate-fadeIn">
        <h1 className="text-4xl font-serif font-bold text-gray-800">Your Wishlist is Empty</h1>
        <p className="mt-4 text-lg text-gray-600">Explore our collections and save your favorite items.</p>
        <Link to="/products" className="mt-6 inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105">
          Find Your Favorites
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <h1 className="text-4xl font-serif font-bold text-center mb-10">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlistItems.map(product => (
            <div key={product.id} className="group relative bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col h-full animate-slideInUp">
              <Link to={`/product/${product.id}`} className="block">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
                  />
                </div>
              </Link>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 flex-grow">
                  <Link to={`/product/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
                <p className="text-xl font-bold text-gray-900 mt-2">${product.price.toFixed(2)}</p>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveClick(product)}
                    className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {productToRemove && (
         <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmRemove}
          title="Remove from Wishlist"
          message={`Are you sure you want to remove "${productToRemove.name}" from your wishlist?`}
        />
      )}
    </>
  );
};

export default WishlistPage;