import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box, Grid } from '@mui/material';

const data = [
    { name: 'Completed', value: 400, color: '#7986cb' },
    { name: 'Pending', value: 300, color: '#ba68c8' },
    { name: 'Unpaid', value: 200, color: '#4db6ac' },
    { name: 'Canceled', value: 100, color: '#ffb74d' },
    { name: 'Returned', value: 80, color: '#ef9a9a' },
    { name: 'Broken', value: 50, color: '#81d4fa' },
];

const OrdersOverview = () => (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
        <Typography
            variant="h6"
            gutterBottom
            sx={{
                color: '#56606e',
                fontSize: '18px',
                lineHeight: 1,
                textAlign : 'center'
            }}
        >
            Orders Overview
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={data}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>

        <Grid container spacing={2} justifyContent="center" mt={2}
            sx={{
                borderTop: '1px solid #e0e0e0',
                paddingTop: 2,
            }}
        >
            {data.map((item, index) => (
                <Grid item size={6} key={index}>
                    <Box
                        display="flex"
                        alignItems="center"
                        marginLeft='40px'
                    >
                        <Box
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                border: `2px solid ${item.color}`,
                                marginRight: 1,
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary', fontSize: '14px' }}
                        >
                            {item.name}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </Grid>

    </Paper>
);

export default OrdersOverview;
