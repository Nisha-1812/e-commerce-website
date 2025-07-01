import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from '../src/components/Carts/Cartcontext'; // ✅ import this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider> {/* ✅ wrap App */}
      <App />
    </CartProvider>
  </React.StrictMode>
);
