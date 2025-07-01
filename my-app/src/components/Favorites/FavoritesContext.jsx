import React, { createContext, useState } from 'react';

export const FavoritesContext=createContext();


export const FavoritesProvider=({ children })=>{
    const [favoriteItems,setFavoriteItems]=useState([]);

const addToFavorites=(product)=>{
    setFavoriteItems(prev=>{
        const exists=prev.find(item=>item.id===product.id);
        return exists ? prev : [...prev,product];
    });
};

const removeFromFavorites=(productId)=>{
    setFavoriteItems(prev => prev.filter(item => item.id !== productId));
};

return(
     <FavoritesContext.Provider value={{ favoriteItems, addToFavorites, removeFromFavorites }}>
        {children}
      </FavoritesContext.Provider>
);
}