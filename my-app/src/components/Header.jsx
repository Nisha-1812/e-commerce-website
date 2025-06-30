import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

const Header = ({ open, setOpen }) => {

  return (
    <div>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#f8f9fa",
          color: "#333",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={() => setOpen(!open)}
            sx={{ marginRight: 2 }}
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
