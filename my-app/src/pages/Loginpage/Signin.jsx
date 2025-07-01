import React, { useState } from 'react';
import './Signin.css'
import loginimg from '../../Assets/Privacy policy-rafiki.svg';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    InputAdornment,
    IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Signin = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className='container loginpage'>
            <div className='row login-content'>
                <div className='col-12 col-md-6 login-img'>
                    <img src={loginimg} alt='login' />
                </div>
                <div className='col-12 col-md-6 login-form '>
                    <Box>
                        <Paper
                            elevation={0}
                            sx={{
                                padding: 4,
                                backgroundColor: 'rgb(23, 43, 61)',
                                color: 'rgb(168, 179, 196)'
                            }}
                        >
                            <Typography
                                variant="h5"
                                gutterBottom
                                align="center"
                                className='signin-head'
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '30px',
                                    mb: 3,
                                }}
                            >
                                Sign In
                            </Typography>

                            <form>
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    margin="normal"
                                    required
                                    sx={{
                                        mt: 3,
                                        input: {
                                            color: 'rgb(168, 179, 196)',
                                        },
                                        '& label': {
                                            color: 'rgb(168, 179, 196)',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'rgb(168, 179, 196)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'primary.main',
                                            },
                                        },
                                    }}
                                />

                                <TextField
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    margin="normal"
                                    required
                                    sx={{
                                        mt: 3,
                                        input: {
                                            color: 'rgb(168, 179, 196)',
                                        },
                                        '& label': {
                                            color: 'rgb(168, 179, 196)',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: 'rgb(168, 179, 196)',
                                            },
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'primary.main',
                                            },
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={togglePassword} edge="end" sx={{ color: '#fff' }}>
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 3, padding: '10px' }}
                                >
                                    Login
                                </Button>
                            </form>

                            <Typography
                                sx={{
                                    fontSize: '15px',
                                    mt: 4,
                                    textAlign: 'center'
                                }}
                            >Don't have an account?
                                <a href='/signup' className='register-link'>Register</a>
                            </Typography>
                        </Paper>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default Signin
