import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button , Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductDetail = () => {

    const { id } = useParams();

    const navigate = useNavigate()

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true)
    const [favorite, setFavorite] = useState(false);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false)
            })
            .catch((error) => {
                console.log('Error fetching product:', error);
                setLoading(false);
            })
    }, [id])

    const StarRating = ({ rating, count }) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} style={{ color: i <= rating ? 'gold' : 'lightgray', fontSize: '24px', }}>
                    ★
                </span>
            );
        }

        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {stars}
                {count !== undefined && <span style={{ fontSize: '15px', color: '#666' }}>({count}reviews)</span>}
            </div>
        );
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleIncreaseQuantity = () => {
        setQuantity(prev => prev + 1)
    }

    const handleDecreaseQuantity = () => {
        setQuantity(prev => prev < 1 ? 0 : prev - 1)
    }

    if (loading) return "Loading product...";
    if (!product) return 'Product not found.';

    return (
        <div className='container product-details-container'>
            <IconButton onClick={handleBack} style={{ position: 'absolute', top: 20, left: 20 }}>
                <ArrowBackIcon />
            </IconButton>
            <div className='row productdetails-container'>
                <div className='product-sec1'>
                    <div className='col-12 col-md-6 product-img'>
                        <img width='100%' height='100%' src={product.image} alt='product-image' />
                    </div>
                </div>
                <div className='col-12 col-md-6 product-details'>
                    <h2 className='product-title'>{product.title}</h2>
                    <p className='product-price'><strong>Price:</strong>₹{product.price}</p>
                    <h3>{product.category}</h3>
                    <p className='product-desc'>{product.description}</p>
                    <StarRating rating={Math.round(product.rating.rate)} count={product.rating.count} />

                    <div className='quantity-box'>
                        <IconButton onClick={handleDecreaseQuantity} color="primary" size="small" sx={{ border: '1px solid #ccc' }}>
                            <RemoveIcon />
                        </IconButton>

                        <Typography variant="body1" sx={{ minWidth: 32, textAlign: 'center' }}>
                            {quantity}
                        </Typography>

                        <IconButton onClick={handleIncreaseQuantity} color="primary" size="small" sx={{ border: '1px solid #ccc' }}>
                            <AddIcon />
                        </IconButton>
                    </div>

                    <div className='product-btns'>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<DoubleArrowIcon />}
                        >
                            Buy Now
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<ShoppingCartIcon />}
                        >
                            Add to Cart
                        </Button>
                        <IconButton onClick={() => setFavorite(prev => !prev)}>
                            {favorite ? (
                                <FavoriteIcon sx={{ color: 'red' }} />
                            ) : (
                                <FavoriteBorderIcon sx={{ color: '#555' }} />
                            )}
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
