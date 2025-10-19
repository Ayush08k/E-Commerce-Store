import React from 'react';
import { Review } from '../types';
import StarRating from './StarRating';

interface ReviewsListProps {
  reviews: Review[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet. Be the first to share your thoughts!</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map(review => (
        <div key={review.id} className="bg-gray-50 p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <StarRating rating={review.rating} />
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
          <p className="text-gray-700">{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
