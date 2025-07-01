import React from 'react';
import './Dashboard.css';
import {
  Grid,
  Paper,
  Box,
  Typography,
} from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SalesReport from '../../components/SalesReport';
import OrdersOverview from '../../components/OrdersOverview';
import RecentOrders from '../../components/RecentOrders';

const cardData = [
  {
    title: "Daily Signups",
    value: "1,530",
    icon: PersonAddIcon,
    color: "rgb(136, 170, 243)",
  },
  {
    title: "Daily Visitors",
    value: "79,508",
    icon: TravelExploreIcon,
    color: "rgb(136, 170, 243)",
  },
  {
    title: "Daily Order",
    value: "15,503",
    icon: ShoppingCartIcon,
    color: "rgb(136, 170, 243)",
  },
  {
    title: "Daily Revenue",
    value: "$15,300",
    icon: MonetizationOnIcon,
    color: "rgb(136, 170, 243)",
  },
];

const Dashboard = () => {
  return (
      <Box sx={{ width: '100%', px: 2 }}>
        <Grid container spacing={3}>
          {cardData.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Grid item key={index} size={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 2,
                    // backgroundColor: card.color,
                    width: '100%',
                    border: "1px solid #e0e0e0",
                    // minHeight: 100,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'rgb(86, 96, 110)',
                        fontSize: '23p',
                        marginBottom: '5px',
                      }}
                    >
                      {card.value}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: '400',
                        fontSize: '15px',
                        letterSpacing: '0.02rem',
                        color: 'rgb(86, 96, 110)',
                      }}
                    >
                      {card.title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: card.color,
                      borderRadius: '15px',
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComponent style={{ color: 'white', fontSize: '30px' }} />
                  </Box>
                </Paper>
              </Grid>
            )
          })}
        </Grid>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item size={8}>
            <Paper elevation={0} sx={{ borderRadius: 3, height: '100%' }}>
              <SalesReport />
            </Paper>
          </Grid>

          <Grid item size={4}>
            <Paper elevation={0} sx={{ borderRadius: 3, height: '100%' }}>
              <OrdersOverview />
            </Paper>
          </Grid>
        </Grid>


        <Box sx={{ mt: 3 }}>
          <RecentOrders />
        </Box>
      </Box>
  );
};

export default Dashboard;
