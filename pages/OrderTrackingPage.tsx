import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { Order, OrderStatus } from '../types';

const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [orderIdInput, setOrderIdInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { getOrderById } = useOrders();

  const findOrder = (id: string) => {
    if (!id.trim()) {
      setError('Please enter an Order ID.');
      setSearchedOrder(null);
      return;
    }
    const foundOrder = getOrderById(id.trim());
    if (foundOrder) {
      setSearchedOrder(foundOrder);
      setOrderIdInput(foundOrder.id);
      setError(null);
    } else {
      setSearchedOrder(null);
      setError(`No order found with ID "${id.trim()}". Please check the ID and try again.`);
    }
  };
  
  useEffect(() => {
    const urlOrderId = searchParams.get('id');
    if (urlOrderId) {
      findOrder(urlOrderId);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    findOrder(orderIdInput);
  };
  
  const statusSteps: OrderStatus[] = ['Processing', 'Shipped', 'Delivered'];
  const getStatusIndex = (status: OrderStatus) => statusSteps.indexOf(status);

  const StatusTracker: React.FC<{ currentStatus: OrderStatus }> = ({ currentStatus }) => {
    const currentIndex = getStatusIndex(currentStatus);
    
    return (
      <div className="flex items-center justify-between w-full my-8">
        {statusSteps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isFuture = index > currentIndex;
          
          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2
                  ${isCompleted || isCurrent ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-500'}
                `}>
                  {isCompleted ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  ) : (
                     <span className={`font-bold ${isCurrent ? 'animate-pulse' : ''}`}>{index + 1}</span>
                  )}
                </div>
                <p className={`mt-2 text-xs sm:text-sm font-semibold ${isCurrent ? 'text-indigo-600' : 'text-gray-600'}`}>
                  {step}
                </p>
              </div>
              {index < statusSteps.length - 1 && (
                <div className={`flex-1 h-1 mx-2 sm:mx-4 rounded
                  ${isCompleted ? 'bg-indigo-600' : 'bg-gray-300'}
                `}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fadeIn">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold">Track Your Order</h1>
        <p className="mt-2 text-gray-600">Enter your order ID below to check its status.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
        <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            placeholder="e.g., ORD12345"
            className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Order ID"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white font-bold py-2 px-8 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Track
          </button>
        </form>
      </div>

      {error && (
        <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center animate-fadeIn">
          {error}
        </div>
      )}

      {searchedOrder && (
        <div className="mt-8 bg-white p-6 sm:p-8 rounded-lg shadow-md animate-fadeIn">
          <h2 className="text-2xl font-bold font-serif mb-4">Order Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-6">
            <p><strong>Order ID:</strong> {searchedOrder.id}</p>
            <p><strong>Order Date:</strong> {searchedOrder.date}</p>
            <p><strong>Total:</strong> ${searchedOrder.total.toFixed(2)}</p>
            <p><strong>Status:</strong> <span className="font-semibold text-indigo-600">{searchedOrder.status}</span></p>
          </div>
          
          <StatusTracker currentStatus={searchedOrder.status} />

          <div>
             <h3 className="text-xl font-semibold border-t pt-6 mt-6 mb-4">Items in this order</h3>
             <ul className="space-y-4">
               {searchedOrder.items.map(item => (
                 <li key={item.id} className="flex items-center gap-4">
                   <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover"/>
                   <div>
                     <p className="font-semibold text-gray-800">{item.name}</p>
                     <p className="text-sm text-gray-500">Qty: {item.quantity} - ${item.price.toFixed(2)} each</p>
                   </div>
                 </li>
               ))}
             </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;