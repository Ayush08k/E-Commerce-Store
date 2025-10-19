import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './context/CartContext';
import { ReviewProvider } from './context/ReviewContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <CartProvider>
        <WishlistProvider>
          <ReviewProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </ReviewProvider>
        </WishlistProvider>
      </CartProvider>
    </HashRouter>
  </React.StrictMode>
);
