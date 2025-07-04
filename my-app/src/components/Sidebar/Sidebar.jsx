import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
} from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useLocation, useNavigate } from 'react-router-dom';
import { SiSparkar } from "react-icons/si";
import "../Sidebar/Sidebar.css"

const drawerwidth = 220;

const menuitems = [
    { text: "Dashboard", icon: <DashboardIcon />, link: '/dashboard' },
    { text: "Products", icon: <ShoppingBagIcon />, link: '/products' },
    { text: "Sign In", icon: <LoginIcon />, link: '/signin' },
    { text: "Sign Up", icon: <HowToRegIcon />, link: '/signup' },
];

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
                        color:"violet"
                    }
                }}
            >
                {/* Logo Row */}
                {open && (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            px: 2,
                            py: 2,
                            gap: 1,
                        }}
                    >
                        <Typography variant="h6" sx={{ color: '#1976d2' }}>
                            <SiSparkar className='company-icon' />
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#1976d2',
                                fontWeight: 700,
                                fontSize: '23px',
                            }}
                        >
                            Sparkzon
                        </Typography>
                    </Box>
                )}

                {/* Menu List */}
                <Box>
                    <List>
                        {menuitems.map(({ text, icon, link }) => (
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
                                        color: location.pathname === link ? '#1976d2' : 'rgb(86, 96, 110)',
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
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
};

export default Sidebar;
