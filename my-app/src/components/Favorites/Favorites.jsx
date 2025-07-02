import React, { useContext } from 'react';
import { FavoritesContext } from './FavoritesContext';
import './Favorites.css';
import { FaMinusCircle } from 'react-icons/fa';

const Favorites = () => {
    const { favoriteItems, removeFromFavorites } = useContext(FavoritesContext);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Your Favorites</h2>
            {favoriteItems.length === 0 ? (
                <p>No Favorite Items</p>
            ) : (
                favoriteItems.map(item => (
                    <div key={item.id} className='favorite-cart'>
                        <div className='favorite-img'>
                            <img src={item.image} width='100%' height='100%' alt='favorite' />
                        </div>
                        <div>
                            <h3>{item.title}</h3>
                            <p>Price:  ₹{item.price}</p>
                            <button
                                onClick={() => removeFromFavorites(item.id)}
                                className='remove-btn'
                            >
                                <FaMinusCircle/>
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Favorites;