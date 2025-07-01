import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Product.css";

// ✅ ReadMore component
const ReadMore = ({ text, maxChars = 50 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = text.length > maxChars;

  return (
    <p>
      {isExpanded || !isLong ? text : `${text.substring(0, maxChars)}...`}
      {isLong && (
        <span
          onClick={() => setIsExpanded(!isExpanded)}
          style={{ color: 'blue', cursor: 'pointer', marginLeft: 8 }}
        >
          {isExpanded ? ' Show less' : ' Learn more'}
        </span>
      )}
    </p>
  );
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      {products.map(product => (
        <div key={product.id} className='product-card'>
          <img className="product-image" src={product.image} alt='image' />
          <h2>{product.title}</h2>
          <p><strong>Price:</strong> ${product.price}</p>
          <ReadMore text={product.description} maxChars={50} />
        </div>
      ))}
    </div>
  );
};

export default Product;
