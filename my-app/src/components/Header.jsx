import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CartContext } from './Carts/Cartcontext';
import { useNavigate } from 'react-router-dom';
import { FavoritesContext } from './Favorites/FavoritesContext';

const drawerWidth = 220;

const Header = ({ open, setOpen }) => {
  const {cartItems}=useContext(CartContext);
const { favoriteItems } = useContext(FavoritesContext);

  const navigate=useNavigate();

  return (
    <div>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "#f8f9fa",
          color: "#333",
          borderBottom: "1px solid #e0e0e0",
          zIndex: 1300,
          left: open ? `${drawerWidth}px` : '64px',
          width: open ? `calc(100% - ${drawerWidth}px)` : 'calc(100% - 64px)',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar>
          <IconButton
            edge='start'
            color='rgb(86, 96, 110)'
            onClick={() => setOpen(!open)}
            sx={{ marginRight: 2, }}
          >
            <ToggleOnIcon />
          </IconButton>
          <Box
            sx={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
          <IconButton color='inherit' onClick={() => navigate("/favorites")}>
  <FaRegHeart />
  {favoriteItems.length > 0 && (
    <span style={{
      fontSize: '12px',
      background: 'red',
      color: 'white',
      borderRadius: '50%',
      padding: '2px 6px',
      marginLeft: '4px'
    }}>{favoriteItems.length}</span>
  )}
</IconButton>


      <IconButton color='inherit' onClick={() => navigate('/cart')}> 
      <MdOutlineShoppingCart />
      {cartItems.length > 0 && (
        <span style={{
          fontSize: '12px',
          background: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: '2px 6px',
          marginLeft: '4px'
        }}>{cartItems.length}</span>
      )}
    </IconButton>

             <IconButton color='inherit'>
              <NotificationsIcon />
            </IconButton>

            <Avatar alt='user' src='https://i.pravatar.cc/40' />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
