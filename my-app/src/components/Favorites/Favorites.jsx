import React, { useContext, useState } from 'react';
import './Favorites.css';
import { FavoritesContext } from './FavoritesContext';
import { CartContext } from '../Carts/Cartcontext';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
    Button,
    Snackbar,
    Alert,
    Box
} from '@mui/material';
import { FaMinusCircle } from 'react-icons/fa';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Favorites = () => {

    const { favoriteItems, removeFromFavorites } = useContext(FavoritesContext);
    const { cartItems, addToCart } = useContext(CartContext);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleAddToCart = (item) => {
        const alreadyInCart = cartItems.some(cartItem => cartItem.id === item.id);
        if (!alreadyInCart) {
            addToCart(item);
            setSnackbarMessage("Added to cart successfully!");
            setOpenSnackbar(true);
        } else {
            setSnackbarMessage("Already in cart!");
            setOpenSnackbar(true);
        }
    };

    return (
        <Box sx={{ minHeight: '84.5vh', padding: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 5, color: '#555', fontSize: '18px', fontWeight: 700 }}>
                My Wishlist <span className='wishlist-count'>({favoriteItems.length} items)</span>
            </Typography>

            {favoriteItems.length === 0 ? (
                <Typography>No Favorite Items</Typography>
            ) : (
                <Grid container spacing={6} justifyContent="flex-start">
                    {favoriteItems.map(item => (
                        <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} sx={{ maxWidth: 250 }}>
                            <Card sx={{ width: 270, height: '100%', display: 'flex', flexDirection: 'column' ,padding:'10px'}}>
                                <CardMedia
                                    component="img"
                                    height="220"
                                    image={item.image}
                                    alt={item.title}
                                    sx={{ objectFit: 'contain', padding: 1 }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1" gutterBottom noWrap>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: ₹{item.price}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, pt: 0 }}>
                                    <IconButton
                                        color="error"
                                        onClick={() => removeFromFavorites(item.id)}
                                    >
                                        <FaMinusCircle />
                                    </IconButton>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        startIcon={<ShoppingCartIcon />}
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        Move to Cart
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ top: '80px !important' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Favorites;
