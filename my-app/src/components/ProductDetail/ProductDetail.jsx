import React, { useContext, useEffect, useState } from 'react';
import './ProductDetail.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Alert, Button, Snackbar, Typography,
  IconButton
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
  DoubleArrow as DoubleArrowIcon,
  Add as AddIcon,
  Remove as RemoveIcon
} from '@mui/icons-material';

import { FavoritesContext } from '../Favorites/FavoritesContext';
import { CartContext } from '../Carts/Cartcontext';
import { data } from '../ProductDetail/Localdata';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedcolor, setSelectedcolor] = useState('');
  const [selectedmodal,setSelectedmodal]=useState("");

  const { cartItems, addToCart } = useContext(CartContext);
  const { favoriteItems, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    if (id.startsWith("local-")) {
      const localProducts = JSON.parse(localStorage.getItem("localProducts")) || [];
      const localProduct = localProducts.find(p => p.id === id);
      setProduct(localProduct || null);
      setLoading(false);
    } else {
      const localDataProduct = data.find(p => p.id === id);
      if (localDataProduct) {
        setProduct(localDataProduct);
        setLoading(false);
      } else {
        axios.get(`https://fakestoreapi.com/products/${id}`)
          .then(res => {
            setProduct(res.data);
            setLoading(false);
          })
          .catch(() => {
            setProduct(null);
            setLoading(false);
          });
      }
    }
  }, [id]);

  const StarRating = ({ rating, count }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} style={{ color: i <= rating ? 'gold' : 'lightgray', fontSize: '24px' }}>★</span>);
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {stars}
        {count !== undefined && <span style={{ fontSize: '15px', color: '#666' }}>({count} reviews)</span>}
      </div>
    );
  };

  const handleBack = () => navigate(-1);
  const handleIncreaseQuantity = () => setQuantity(prev => prev + 1);
  const handleDecreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (loading) return "Loading product...";
  if (!product) return 'Product not found.';

  const isInCart = cartItems.some(item => item.id === product.id);
  const isInFavorites = favoriteItems.some(item => item.id === product.id);

  const colorKeys = product.availableColors ? Object.keys(product.availableColors) : [];
  const colorImage =
    selectedcolor && product.availableColors?.[selectedcolor]
      ? product.availableColors[selectedcolor]
      : product.image;


        const modalKeys = product.availablemodals ? Object.keys(product.availablemodals) : [];
  const modalImage =
    selectedmodal && product.availablemodals?.[selectedmodal]
      ? product.availablemodals[selectedmodal]
      : product.image;

  return (
    <div className='container product-details-container'>
      <IconButton onClick={handleBack} style={{ position: 'absolute', top: 20, left: 20 }}>
        <ArrowBackIcon />
      </IconButton>

      <div className='row productdetails-container'>
        <div className='product-sec1'>
          <div className='col-12 col-md-6 product-img'>
            <img width='100%' height='100%' src={colorImage} alt='product' />
          </div>
        </div>

        <div className='col-12 col-md-6 product-details'>
          <h2 className='product-title'>{product.title}</h2>
          <p className='product-price'><strong>Price:</strong> ₹{product.price}</p>
          <h3>{product.category}</h3>
          <p className='product-desc'>{product.description}</p>

          {product.availableSizes?.length > 0 && (
            <div>
              <label>Select Size:</label>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                <option value="">Select size</option>
                {product.availableSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
          )}

          {product.availableUnits?.length > 0 && (
            <div>
              <label>Select Unit:</label>
              <select value={selectedUnit} onChange={(e) => setSelectedUnit(e.target.value)}>
                <option value="">Select unit</option>
                {product.availableUnits.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          )}

            {product.availablemodals?.length > 0 && (
            <div>
              <label>Select model:</label>
              <select value={selectedSize} onChange={(e) => setSelectedmodal(e.target.value)}>
                <option value="">Select modal</option>
                {product.availablemodals.map(modal => (
                  <option key={modal} value={modal}>{modal}</option>
                ))}
              </select>
            </div>
          )}

          {colorKeys.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Select Color:</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {colorKeys.map((color) => (
                  <div
                    key={color}
                    onMouseEnter={() => setSelectedcolor(color)}
                    onClick={() => setSelectedcolor(color)}
                    style={{
                      border: selectedcolor === color ? '3px solid #007BFF' : '2px solid #ccc',
                      borderRadius: '8px',
                      padding: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease-in-out'
                    }}
                  >
                    <img
                      src={product.availableColors[color]}
                      alt={color}
                      width="60"
                      height="60"
                      style={{ objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div style={{ textAlign: 'center', fontSize: '12px', marginTop: '4px' }}>{color}</div>
                  </div>
                ))}
              </div>
            </div>
          )}


          
        

          <StarRating rating={product.rating?.rate ? Math.round(product.rating.rate) : 4} count={product.rating?.count ?? 0} />

          <div className='quantity-box'>
            <IconButton onClick={handleDecreaseQuantity}><RemoveIcon /></IconButton>
            <Typography>{quantity}</Typography>
            <IconButton onClick={handleIncreaseQuantity}><AddIcon /></IconButton>
          </div>

          <div className='product-btns'>
            <Button variant="contained" color="success" startIcon={<DoubleArrowIcon />}>Buy Now</Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<ShoppingCartIcon />}
              onClick={() => {
             if (quantity >= 1) {
  const imageToUse = selectedcolor && product.availableColors?.[selectedcolor]
    ? product.availableColors[selectedcolor]
    : product.image;

  const productWithVariant = {
    ...product,
    selectedSize,
    selectedUnit,
    selectedcolor,
    selectedmodal,
    image: imageToUse,
    variantId: `${product.id}-${selectedSize}-${selectedUnit}-${selectedcolor}-${selectedmodal}` // optional: useful for deduping or future checks
  };

  addToCart(productWithVariant, quantity);
  setOpenSnackbar(true);
}

              }}
            >
              Add to Cart
            </Button>

            <IconButton
              onClick={() => {
                setFavorite(prev => !prev);
                isInFavorites ? removeFromFavorites(product.id) : addToFavorites(product);
              }}
            >
              {favorite ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon sx={{ color: '#555' }} />}
            </IconButton>

            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={() => setOpenSnackbar(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert severity="success" onClose={() => setOpenSnackbar(false)}>Added to cart successfully!</Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
