import React, { useState } from 'react';
import { Paper, Typography, Tabs, Tab } from '@mui/material';
import { Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart } from 'recharts';

const data = [
    { date: '4 June', referral: 100, direct: 140, social: 50 },
    { date: '5 June', referral: 180, direct: 40, social: 160 },
    { date: '6 June', referral: 40, direct: 180, social: 110 },
    { date: '7 June', referral: 80, direct: 60, social: 130 },
    { date: '8 June', referral: 150, direct: 30, social: 180 },
    { date: '9 June', referral: 60, direct: 190, social: 90 },
    { date: '10 June', referral: 70, direct: 20, social: 140 },
];

const SalesReport = () => {

    const [tab, setTab] = useState(0);

    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    color: '#56606e',
                    fontSize: '18px',
                    lineHeight: 1,
                    borderBottom: '1px solid #e0e0e0',
                    paddingBottom: 2,
                }}
            >
                Sales Report
            </Typography>
            <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} sx={{ mb: 2 }}>
                <Tab label="Today's" />
                <Tab label="Monthly" />
                <Tab label="Yearly" />
            </Tabs>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="referral" stroke="#3f51b5" fill="#3f51b5" fillOpacity={0.2} strokeWidth={2} dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                    />
                    <Area type="monotone" dataKey="direct" stroke="#f48fb1" fill="#f48fb1" fillOpacity={0.2} strokeWidth={2} dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                    />
                    <Area type="monotone" dataKey="social" stroke="#81c784" fill="#81c784" fillOpacity={0.2} strokeWidth={2} dot={{ r: 3 }}
                        activeDot={{ r: 6 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default SalesReport;
