import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import "./Product.css";
import { CartContext } from '../Carts/Cartcontext';
import { FavoritesContext } from '../Favorites/FavoritesContext';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Snackbar, Alert, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import teddy from "../../Assets/blueteddy.jpg"
import car from "../../Assets/orangecar.jpg"
import pinkteddy from "../../Assets/pinkteddy.jpg"
import blackcar from "../../Assets/blackcar.jpg"
import yellowteddy from "../../Assets/yellowteddy.jpg"
import multicar from "../../Assets/multicar.jpg"
import redteddy from "../../Assets/redteddy.jpg"
import unicorn from "../../Assets/unicorn.jpg"
import elephant from "../../Assets/elephant.jpg"
import panda from "../../Assets/panda.jpg"
import camera from "../../Assets/camera.jpg"
import pink from "../../Assets/pink.jpg"
import ring from "../../Assets/ring.jpg"
import batterycar from "../../Assets/batterycar.jpg"
import pinkunicorn from "../../Assets/pinkunicorn.jpg"
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// Local static data
const data = [
  {
    "id": 'local-1',
    "title": " blue Color Teddy Bear-Soft ",
    "image": teddy,
    "description": "CHIRKUT Soft Toys 3 Feet blue Color Teddy Bear Soft Toys for Girls, Birthday Gift friend, Wedding, Special || 3 Feet blue",
    "category": "toys",
    "price": 300
  },
  {
    "id": 'local-2',
    "title": "Metal vintage car ",
    "image": car,
    "description": "classical metal vintage car toy car Pullback",
    "category": "toys",
    "price": 350,
  },
  {
    "id": 'local-3',
    "title": "3 Feet pint Teddybear-Soft ",
    "image": pinkteddy,
    "description": "Webby 3 Feet Huggable Teddy Bear with Neck Bow Pink",
    "category": "toys",
    "price": 320
  },
  {
    "id": 'local-4',
    "title": " Nissan GTR R35 Sports Car ",
    "image": blackcar,
    "description": "KTRS ENTERPRISE 1:24 For Nissan GTR R35 Sports Car Alloy Model Car Kids Toys",
    "category": "toys",
    "price": 390
  },
  {
    "id": 'local-5',
    "title": "Yellow Teddybear -Soft",
    "image": yellowteddy,
    "description": "CHIRKUT Soft Toys 3 Feet Yellow Color Teddy Bear with Neck Bow Tie",
    "category": "toys",
    "price": 350
  },
  {
    "id": 'local-6',
    "title": "Mini Car Toys Set ",
    "image": multicar,
    "description": "YBN Mini Car Toys Set - 12 Pull-Back Cars for Boys Kids",
    "category": "toys",
    "price": 290,
  },
  {
    "id": 'local-7',
    "title": "Red Teddtbear with Cap ",
    "image": redteddy,
    "description": "Sanvidecors Cute Red Cap Red Teddy Bear",
    "category": "toys",
    "price": 323
  },
  {
    "id": 'local-8',
    "title": "Mini Unicorn Toy",
    "image": unicorn,
    "description": "Tiny Miny Unicorn Soft Toys, Kids Toys - 25 cm (Yellow)",
    "category": "toys",
    "price": 200,
  },
  {
    "id": 'local-9',
    "title": "Elephant Soft Toy ",
    "image": elephant,
    "description": "Super Soft Elephant with bow 40 cm one piece",
    "category": "toys",
    "price": 370,
  },
  {
    "id": 'local-10',
    "title": "Panda Mascot – Soft Toy ",
    "image": panda,
    "description": "Cute Panda Plush Toy",
    "category": "toys",
    "price": 500,
  },
  {
    "id": 'local-11',
    "title": "Digital Camera-Kids",
    "image": camera,
    "description": "NINE CUBE Kids Digital Camera",
    "category": "toys",
    "price": 570,
  },
  {
    "id": 'local-12',
    "title": "PRAYOMA ENTERPRISE Doll",
    "image": pink,
    "description": "PRAYOMA ENTERPRISE Doll - 108  (Pink)",
    "category": "toys",
    "price": 300,
  },
  {
    "id": 'local-13',
    "title": "Teddy Stacking Ring",
    "image": ring,
    "description": "TOYZTREND Plastic Baby Kids Teddy Stacking Ring",
    "category": "toys",
    "price": 350,
  },
  {
    "id": 'local-14',
    "title": "WMac Chargebal Racing Car",
    "image": batterycar,
    "description": "Remote Control Racing Car for Kids",
    "category": "toys",
    "price": 390,
  },
  {
    "id": 'local-15',
    "title": "Babique Unicorn Teddy ",
    "image": pinkunicorn,
    "description": "Babique Unicorn Teddy Bear Plush Soft Toy",
    "category": "toys",
    "price": 270,
  }
];

const Readmore = ({ text, maxChars = 30 }) => {
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
      <span key={i} style={{ color: i <= rating ? 'orange' : 'lightgray' }}>★</span>
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
  const toggleTitle = () => setIsExpanded(prev => !prev);

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
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { cartItems, addToCart } = useContext(CartContext);
  const { favoriteItems, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

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

  const allProducts = [...products, ...data];

  const handleSearch = () => {
    const filteredData = allProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category === selectedCategory)
    );
    setFilteredProducts(filteredData);
  };

  const displayProducts = searchTerm
    ? filteredProducts
    : allProducts.filter(product =>
      selectedCategory === "all" || product.category === selectedCategory
    );

  if (loading) return <p>Loading products...</p>;

  return (
    <>
      <div className='searchbutton'>
        <div>
          <FormControl fullWidth size="small" sx={{ width: 220 }}>
            <InputLabel id="category-label"><strong>Filter by Category</strong></InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={selectedCategory}
              label="Filter by Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="men's clothing">Men's Clothing</MenuItem>
              <MenuItem value="jewelery">Jewelery</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="women's clothing">Women's Clothing</MenuItem>
              <MenuItem value="toys">Toys</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div style={{width: '100%'}}> 
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
            sx={{ width: '50%' }}
          />
          <IconButton color="primary" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </div>
      </div>

      <div className='product-grid'>
        {/* For displaying API products */}
        {displayProducts.map((product, index) => {
          const isInCart = cartItems.some(item => item.id === product.id);
          const isInFavorites = favoriteItems.some(item => item.id === product.id);

          return (
            <div key={`api-${product.id}`} className='product-card'>
              <p className='product-icon'
                onClick={() =>
                  isInFavorites
                    ? removeFromFavorites(product.id)
                    : addToFavorites(product)
                }
                style={{ cursor: "pointer", fontSize: "20px", color: isInFavorites ? "red" : "gray" }}
              >
                {isInFavorites ? <FaHeart /> : <FaRegHeart />}
              </p>

              <Link to={`/product/${product.id}`}>
                <img className="product-image" src={product.image} alt='productimage' />
              </Link>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <ProductTitle title={product.title} />
              </Link>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <h2 className='product-category'>{product.category}</h2>
              <Readmore text={product.description} maxChars={30} />
              <div className='rating'>
                <StarRating
                  rating={product.rating ? Math.round(product.rating.rate) : 0}
                  count={product.rating?.count || 0}
                />
              </div>
              <button
                className='cart-button'
                onClick={() => {
                  if (!isInCart) {
                    addToCart(product);
                    setOpenSnackbar(true);
                  }
                }}
                disabled={isInCart}
                style={{
                  opacity: isInCart ? 0.6 : 1,
                  cursor: isInCart ? 'not-allowed' : 'pointer',
                }}
              >
                {isInCart ? 'Go To Cart' : 'Add to Cart'}
              </button>
            </div>
          );
        })}

        {/* For displaying arraylist of products */}
        {/* {data.map((product, index) => {
          const isInCart = cartItems.some(item => item.title === product.title);
          const isInFavorites = favoriteItems.some(item => item.title === product.title);

          return (
            <div key={`local-${index}`} className='product-card'>
              <p className='product-icon'
                onClick={() =>
                  isInFavorites
                    ? removeFromFavorites(product.title)
                    : addToFavorites({ ...product, id: product.title })
                }
                style={{ cursor: "pointer", fontSize: "20px", color: isInFavorites ? "red" : "gray" }}
              >
                {isInFavorites ? <FaHeart /> : <FaRegHeart />}
              </p>

              <Link to={`/product/${product.id}`}>
                <img className="product-image" src={product.image} alt='productimage' />
              </Link>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <ProductTitle title={product.title} />
              </Link>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <h2 className='product-category'>{product.category}</h2>
              <Readmore text={product.description} maxChars={30} />
              <div className='rating'>
                <StarRating rating={4} count={20} />
              </div>
              <button
                className='cart-button'
                onClick={() => {
                  if (!isInCart) {
                    addToCart({ ...product, id: product.title });
                    setOpenSnackbar(true);
                  }
                }}
                disabled={isInCart}
                style={{
                  opacity: isInCart ? 0.6 : 1,
                  cursor: isInCart ? 'not-allowed' : 'pointer',
                }}
              >
                {isInCart ? 'Go To Cart' : 'Add to Cart'}
              </button>
            </div>
          );
        })} */}
      </div>

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
    </>
  );
};

export default Product;
