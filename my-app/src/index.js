import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from '../src/components/Carts/Cartcontext'; 
import { FavoritesProvider } from '../src/components/Favorites/FavoritesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <CartProvider>
    <FavoritesProvider>
      <App />
    
    </FavoritesProvider>
  </CartProvider>
  </React.StrictMode>
);
