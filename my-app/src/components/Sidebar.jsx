import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Box,
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerwidth = 220

const menuitems = [
    { text: "Dashboard", icon: <DashboardIcon />, link: '/dashboard' },
    { text: "Products", icon: <ShoppingBagIcon />, link: '/products' },
    { text: "Invoices", icon: <ReceiptLongIcon />, link: '/invoices' },
    { text: "Sign In", icon: <LoginIcon />, link: '/signin' },
    { text: "Sign Up", icon: <HowToRegIcon />, link: '/signup' },
]

const Sidebar = ({ open }) => {

    const navigate = useNavigate();

    const location = useLocation();

    return (
        <div>
            <Drawer
                variant='permanent'
                sx={{
                    width: open ? drawerwidth : 64,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: open ? drawerwidth : 64,
                        boxSizing: 'border-box',
                        backgroundColor: '#f8f9fa',
                        transition: "width 0.3s",
                        overflowX: 'hidden',
                        height: '100vh',
                    }
                }}
            >
                 <Box sx={{ px: open ? 2 : 0 }}>
                    {open && (
                        <Typography variant="h6" sx={{
                             mt: 1 ,
                             p:2,
                             color:'#1976d2',
                             fontWeight:700,
                             fontSize:'23px'
                             }}
                             >
                            Sparkzon
                        </Typography>
                    )}
                </Box>
                {/* <Toolbar /> */}
                <Box>
                    <List>
                        {menuitems.map(({ text, icon, link }) =>
                        (
                            <ListItem
                                button
                                key={text}
                                onClick={() => navigate(link)}
                                sx={{
                                    justifyContent: open ? 'flex-start' : 'center',
                                    backgroundColor: location.pathname === link ? '#e3f2fd' : 'transparent',
                                    borderLeft: location.pathname === link ? '5px solid #1976d2' : '5px solid transparent',
                                    color: location.pathname === link ? '#1976d2' : 'inherit',
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : 'auto',
                                        justifyContent: 'center',
                                        color: location.pathname === link ? '#1976d2' : 'rgb(86, 96, 110)'
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                {open && (
                                    <ListItemText
                                        primary={text}
                                        sx={{
                                            color: location.pathname === link ? '#1976d2' : 'rgb(86, 96, 110)',
                                        }}
                                    />
                                )}
                            </ListItem>
                        ))
                        }
                    </List>
                </Box>
            </Drawer>
        </div>
    )
}

export default Sidebar
