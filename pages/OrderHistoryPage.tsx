import React from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { Order } from '../types';

const OrderHistoryPage: React.FC = () => {
  const { orders } = useOrders();

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-100';
      case 'Shipped':
        return 'text-blue-600 bg-blue-100';
      case 'Processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'Cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl animate-fadeIn">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold">My Order History</h1>
        <p className="mt-2 text-gray-600">View details of all your past orders.</p>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(order => (
              <Link
                key={order.id}
                to={`/track-order?id=${order.id}`}
                className="block p-4 border rounded-lg hover:shadow-md hover:border-indigo-300 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <p className="font-bold text-lg text-indigo-600">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-500">Date: {order.date}</p>
                  </div>
                  <div className="flex flex-col sm:text-right mt-2 sm:mt-0">
                    <p className="font-semibold text-gray-800">${order.total.toFixed(2)}</p>
                    <span className={`mt-1 text-xs font-semibold px-2 py-1 rounded-full self-start sm:self-end ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">You have no past orders.</p>
            <Link to="/products" className="mt-4 inline-block text-indigo-600 hover:underline">
              Start Shopping Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
