import { useCallback } from 'react';
import { Product } from '../types';
import { ALL_PRODUCTS } from '../constants';

const STORAGE_KEY = 'recentlyViewedProductIds';
const MAX_RECENTLY_VIEWED = 8;

export const useRecentlyViewed = () => {
  const getRecentlyViewedIds = useCallback((): string[] => {
    try {
      const storedIds = localStorage.getItem(STORAGE_KEY);
      return storedIds ? JSON.parse(storedIds) : [];
    } catch (error) {
      console.error('Error reading recently viewed products from localStorage', error);
      return [];
    }
  }, []);

  const addProductToRecentlyViewed = useCallback((productId: string) => {
    if (!productId) return;

    try {
      const currentIds = getRecentlyViewedIds();
      // Remove the id if it already exists to move it to the front
      const filteredIds = currentIds.filter(id => id !== productId);
      // Add the new id to the beginning of the array
      const newIds = [productId, ...filteredIds];
      // Limit the number of recently viewed items
      const limitedIds = newIds.slice(0, MAX_RECENTLY_VIEWED);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedIds));
    } catch (error) {
      console.error('Error saving recently viewed product to localStorage', error);
    }
  }, [getRecentlyViewedIds]);

  const getRecentlyViewedProducts = useCallback((): Product[] => {
      const ids = getRecentlyViewedIds();
      // Map IDs to actual products, maintaining the order from localStorage
      const products = ids.map(id => ALL_PRODUCTS.find(p => p.id === id)).filter((p): p is Product => p !== undefined);
      return products;
  }, [getRecentlyViewedIds]);

  return { addProductToRecentlyViewed, getRecentlyViewedProducts };
};
