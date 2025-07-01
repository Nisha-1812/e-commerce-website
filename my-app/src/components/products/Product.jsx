import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import "./Product.css";
import { CartContext } from '../Carts/Cartcontext';

const Readmore = ({ text, maxChars = 30 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = text.length > maxChars;

  return (
    <p>
      {isExpanded || !isLong ? text : `${text.substring(0, maxChars)}....`}
      {isLong && (
        <span
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ color: 'blue', cursor: 'pointer', marginLeft: 8 }}
        >
          {isExpanded ? "show less" : "Read more"}
        </span>
      )}
    </p>
  );
};

const StarRating = ({ rating, count }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} style={{ color: i <= rating ? 'orange' : 'lightgray' }}>
        ★
      </span>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {stars}
      {count !== undefined && (
        <span style={{ fontSize: '14px', color: '#666' }}>({count})</span>
      )}
    </div>
  );
};

const ProductTitle = ({ title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleTitle = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <h2 onClick={toggleTitle} style={{ cursor: 'pointer', display: 'inline', color: '#333',fontSize:"21px" }}>
      {isExpanded
        ? title + ' (show less)'
        : title.length > 15
          ? title.slice(0, 15) + '...'
          : title}
    </h2>
  );
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { cartItems, addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className='product-grid'>
      {products.map(product => {
        const isInCart = cartItems.some(item => item.id === product.id);

        return (
          <div key={product.id} className='product-card'>
            <img className="product-image" src={product.image} alt='product' />
            <ProductTitle className="product-title" title={product.title} />
            <p><strong>Price:</strong> ₹{product.price}</p>
            <h2 className='product-category'>{product.category}</h2>
            <Readmore text={product.description} maxChars={30} />
            <div className='rating'>
              <StarRating rating={Math.round(product.rating.rate)} count={product.rating.count} />
            </div>

            <button
              className='cart-button'
              onClick={() => {
                if (!isInCart) {
                  addToCart(product);
                  alert(`${product.title} added to cart!`);
                }
              }}
              disabled={isInCart}
              style={{
                opacity: isInCart ? 0.6 : 1,
                cursor: isInCart ? 'not-allowed' : 'pointer',
              }}
            >
              {isInCart ? 'Add to cart' : 'Add to Cart'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
