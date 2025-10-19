import React, { useState } from 'react';
import { useReviews } from '../context/ReviewContext';

interface ProductReviewFormProps {
  productId: string;
}

const StarInput: React.FC<{ rating: number, onRatingChange: (rating: number) => void }> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            className={`text-3xl transition-colors ${
              starValue <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => onRatingChange(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`Rate ${starValue} stars`}
          >
            &#9733;
          </button>
        );
      })}
    </div>
  );
};

const ProductReviewForm: React.FC<ProductReviewFormProps> = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addReview } = useReviews();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && text.trim() !== '') {
      addReview(productId, rating, text);
      setRating(0);
      setText('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
          <StarInput rating={rating} onRatingChange={setRating} />
        </div>
        <div>
          <label htmlFor="review-text" className="block text-sm font-medium text-gray-700">
            Your Review
          </label>
          <textarea
            id="review-text"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Tell us what you think..."
            required
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            disabled={rating === 0 || text.trim() === ''}
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        </div>
        {submitted && (
          <p className="text-center text-green-600 font-semibold animate-fadeIn">
            Thank you for your feedback!
          </p>
        )}
      </form>
    </div>
  );
};

export default ProductReviewForm;
