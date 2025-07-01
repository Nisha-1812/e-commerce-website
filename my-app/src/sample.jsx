// components/Favorites/Favorites.jsx
import React, { useContext } from 'react';
import { FavoritesContext } from './FavoritesContext';

const Favorites = () => {
  const { favoriteItems, removeFromFavorites } = useContext(FavoritesContext);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Favorites</h2>
      {favoriteItems.length === 0 ? (
        <p>No favorite items</p>
      ) : (
        favoriteItems.map(item => (
          <div key={item.id} 
          style={{ marginBottom: "10px",
           borderBottom: "1px solid #ccc",
            paddingBottom: "10px" }}>
            <h3>{item.title}</h3>
            <p>Price: ₹{item.price}</p>
            <button
              onClick={() => removeFromFavorites(item.id)}
              style={{ padding: "5px 10px",
                 backgroundColor: "#555",
                  color: "#fff", border: "none",
                   borderRadius: "4px", cursor: "pointer" }}
            >
              Remove from Favorites
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Favorites;
