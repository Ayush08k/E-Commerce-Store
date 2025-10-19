import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import { useReviews } from '../context/ReviewContext';
import { useWishlist } from '../context/WishlistContext';
import ConfirmationModal from './ConfirmationModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { getReviewStats } = useReviews();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { id, name, price, image } = product;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { averageRating, reviewCount } = getReviewStats(id);
  const isWishlisted = isInWishlist(id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      setIsModalOpen(true);
    } else {
      addToWishlist(product);
    }
  };
  
  const handleConfirmRemove = () => {
    removeFromWishlist(id);
  };

  return (
    <>
      <div className="group relative bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 z-10 p-2 bg-white rounded-full transition-colors duration-200 ${isWishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <Link to={`/product/${id}`} className="block">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
            />
          </div>
        </Link>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 flex-grow">
            <Link to={`/product/${id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <div className="flex items-center mt-2">
            <StarRating rating={averageRating} />
            {reviewCount > 0 && <span className="text-gray-500 text-sm ml-2">({reviewCount})</span>}
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-xl font-bold text-gray-900">${price.toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="relative z-10 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Remove from Wishlist"
        message="Are you sure you want to remove this item from your wishlist?"
      />
    </>
  );
};

export default ProductCard;