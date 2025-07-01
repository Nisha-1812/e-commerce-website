import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import "./Product.css";
import { CartContext } from '../Carts/Cartcontext';
import { Link } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
    <h2 onClick={toggleTitle} style={{ cursor: 'pointer', display: 'inline', color: '#333', fontSize: "21px" }}>
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

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  const handleSearch = () => {
    const filteredData = products.filter(product => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase())
    })
    setFilteredProducts(filteredData)
  }

  const displayProducts = searchTerm ? filteredProducts : products;

  return (
    <>
      <div className='searchbutton'>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          sx={{
            width:'50%'
          }}
        />
        <IconButton color="primary" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </div>
      <div className='product-grid'>
        {displayProducts.map((product, index) => {
          const isInCart = cartItems.some(item => item.id === product.id);

          return (
            <div key={product.id} className='product-card'>
              <Link to={`/product/${index + 1}`}><img className="product-image" src={product.image} alt='productimage'></img></Link>
              <Link to={`/product/${index + 1}`} style={{ textDecoration: 'none' }}><ProductTitle title={product.title} /></Link>
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
                    setOpenSnackbar(true)
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


              <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ top: '80px !important' }}
              >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                  Added to cart successfully!
                </Alert>
              </Snackbar>
            </div>
          );
        })}
      </div></>
  );
};

export default Product;
