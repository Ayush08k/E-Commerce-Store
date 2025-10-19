import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { Review } from '../types';

interface ReviewStats {
  averageRating: number;
  reviewCount: number;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (productId: string, rating: number, text: string) => void;
  getReviews: (productId: string) => Review[];
  getReviewStats: (productId: string) => ReviewStats;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

const REVIEWS_STORAGE_KEY = 'productReviews';

export const ReviewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const localData = localStorage.getItem(REVIEWS_STORAGE_KEY);
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse reviews from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (productId: string, rating: number, text: string) => {
    const newReview: Review = {
      id: new Date().toISOString(),
      productId,
      rating,
      text,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    setReviews(prevReviews => [...prevReviews, newReview]);
  };

  const getReviews = useCallback((productId: string): Review[] => {
    return reviews.filter(review => review.productId === productId).sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());
  }, [reviews]);

  const getReviewStats = useCallback((productId: string): ReviewStats => {
    const productReviews = reviews.filter(review => review.productId === productId);
    const reviewCount = productReviews.length;

    if (reviewCount === 0) {
      return { averageRating: 0, reviewCount: 0 };
    }

    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviewCount;

    return {
      averageRating: parseFloat(averageRating.toFixed(1)),
      reviewCount,
    };
  }, [reviews]);

  const value = {
    reviews,
    addReview,
    getReviews,
    getReviewStats,
  };

  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
};

export const useReviews = (): ReviewContextType => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};
