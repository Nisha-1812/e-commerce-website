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
import { useNavigate } from 'react-router-dom';

const drawerwidth = 220;

const menuitems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Products", icon: <ShoppingBagIcon />,path: "/products" },
    { text: "Invoices", icon: <ReceiptLongIcon /> },
    { text: "Sign In", icon: <LoginIcon /> },
    { text: "Sign Up", icon: <HowToRegIcon />, path: "/signup" },
];

const Sidebar = ({ open }) => {
    const navigate = useNavigate();

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
                    }
                }}
            >
                <Toolbar />
                <Box sx={{ px: open ? 2 : 0 }}>
                    {open && (
                        <Typography variant="h6" sx={{ mt: 1 }}>
                            Dashboard
                        </Typography>
                    )}
                </Box>
                <Box>
                    <List>
                        {menuitems.map(({ text, icon, path }) => (
                            <ListItem
                                button
                                key={text}
                                onClick={() => navigate(path)}
                                sx={{ justifyContent: open ? 'flex-start' : 'center' }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : 'auto',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                {open && (<ListItemText primary={text} />)}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
};

export default Sidebar;
