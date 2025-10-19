import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order } from '../types';
import { ALL_PRODUCTS } from '../constants';

interface OrderContextType {
  orders: Order[];
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const ORDERS_STORAGE_KEY = 'mockOrders';

const generateMockOrders = (): Order[] => [
  {
    id: 'ORD12345',
    status: 'Shipped',
    date: 'October 26, 2023',
    items: [
      { ...ALL_PRODUCTS[0], quantity: 1 },
      { ...ALL_PRODUCTS[2], quantity: 1 }
    ],
    total: ALL_PRODUCTS[0].price + ALL_PRODUCTS[2].price,
  },
  {
    id: 'ORD67890',
    status: 'Delivered',
    date: 'October 22, 2023',
    items: [{ ...ALL_PRODUCTS[4], quantity: 2 }],
    total: ALL_PRODUCTS[4].price * 2,
  },
  {
    id: 'ORD54321',
    status: 'Processing',
    date: 'October 27, 2023',
    items: [{ ...ALL_PRODUCTS[6], quantity: 1 }],
    total: ALL_PRODUCTS[6].price,
  },
];


export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const localData = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (localData) {
        setOrders(JSON.parse(localData));
      } else {
        const mockOrders = generateMockOrders();
        localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(mockOrders));
        setOrders(mockOrders);
      }
    } catch (error) {
      console.error("Could not process orders from localStorage", error);
      const mockOrders = generateMockOrders();
      setOrders(mockOrders);
    }
  }, []);

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id.toLowerCase() === orderId.toLowerCase());
  };
  
  const value = { orders, getOrderById };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};