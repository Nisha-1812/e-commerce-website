import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Chip,
} from '@mui/material';

const orders = [
    {
        id: 1,
        product: 'Coach Swagger',
        units: '1 Unit',
        date: 'Oct 20, 2025',
        cost: '$230',
        status: 'COMPLETED',
    },
    {
        id: 2,
        product: 'Toddler Shoes, Gucci Watch',
        units: '2 Units',
        date: 'Nov 15, 2025',
        cost: '$550',
        status: 'DELAYED',
    },
    {
        id: 3,
        product: 'Hat Black Suits',
        units: '1 Unit',
        date: 'Nov 18, 2025',
        cost: '$325',
        status: 'ON HOLD',
    },
    {
        id: 4,
        product: 'Backpack Gents, Swimming Cap Slin',
        units: '5 Units',
        date: 'Dec 13, 2025',
        cost: '$200',
        status: 'COMPLETED',
    },
    {
        id: 5,
        product: 'Speed 500 Ignite',
        units: '1 Unit',
        date: 'Dec 23, 2025',
        cost: '$150',
        status: 'CANCELLED',
    },
    {
        id: 4,
        product: 'Backpack Gents, Swimming Cap Slin',
        units: '5 Units',
        date: 'Dec 13, 2025',
        cost: '$200',
        status: 'COMPLETED',
    },
    {
        id: 5,
        product: 'Speed 500 Ignite',
        units: '1 Unit',
        date: 'Dec 23, 2025',
        cost: '$150',
        status: 'CANCELLED',
    },
    {
        id: 4,
        product: 'Backpack Gents, Swimming Cap Slin',
        units: '5 Units',
        date: 'Dec 13, 2025',
        cost: '$200',
        status: 'COMPLETED',
    },
    {
        id: 5,
        product: 'Speed 500 Ignite',
        units: '1 Unit',
        date: 'Dec 23, 2025',
        cost: '$150',
        status: 'CANCELLED',
    },
];

const statusColor = {
    COMPLETED: { color: 'success', label: 'COMPLETED' },
    DELAYED: { color: 'info', label: 'DELAYED' },
    'ON HOLD': { color: 'warning', label: 'ON HOLD' },
    CANCELLED: { color: 'error', label: 'CANCELLED' },
};

const RecentOrders = () => (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography
                variant="h6"
                sx={{
                    color: '#56606e',
                    fontSize: '18px',
                    lineHeight: 1,
                }}
            >
                Recent Orders
            </Typography>
        </Box>

        <Box
            sx={{
                height: '350px',
                overflowY: 'auto',
            }}
        >
            <Table>
                <TableHead
                    sx={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#fff'
                    }}
                >
                    <TableRow>
                        <TableCell sx={{ fontWeight: 400, fontSize: '15px', letterSpacing: '0.02rem', color: 'rgb(86, 96, 110)' }}>Order ID</TableCell>
                        <TableCell sx={{ fontWeight: 400, fontSize: '15px', letterSpacing: '0.02rem', color: 'rgb(86, 96, 110)' }}>Product Name</TableCell>
                        <TableCell sx={{ fontWeight: 400, fontSize: '15px', letterSpacing: '0.02rem', color: 'rgb(86, 96, 110)' }}>Units</TableCell>
                        <TableCell sx={{ fontWeight: 400, fontSize: '15px', letterSpacing: '0.02rem', color: 'rgb(86, 96, 110)' }}>Order Date</TableCell>
                        <TableCell sx={{ fontWeight: 400, fontSize: '15px', letterSpacing: '0.02rem', color: 'rgb(86, 96, 110)' }}>Order Cost</TableCell>
                        <TableCell sx={{ fontWeight: 400, fontSize: '15px', letterSpacing: '0.02rem', color: 'rgb(86, 96, 110)' }}>Status</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ color: 'text.secondary', fontSize: '14px' }}>{order.id}</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontSize: '14px' }}>{order.product}</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontSize: '14px' }}>{order.units}</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontSize: '14px' }}>{order.date}</TableCell>
                            <TableCell sx={{ color: 'text.secondary', fontSize: '14px' }}>{order.cost}</TableCell>
                            <TableCell>
                                <Chip
                                    label={statusColor[order.status].label}
                                    color={statusColor[order.status].color}
                                    size="small"
                                    sx={{ borderRadius: '10px', fontWeight: 500 }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    </Paper>
);

export default RecentOrders;
