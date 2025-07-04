import React, { useState } from "react";
import "./Signin.css";
import loginimg from "../../Assets/signincover.jpg";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container loginpage">
      <div className="login-content">
       
        <div className=" login-form ">
           
          <Box>
            <Paper
              elevation={0}
              sx={{
                padding: 4,
                backgroundColor: "white",
                color: "rgb(168, 179, 196)",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                className="signin-head"
                sx={{
                  fontWeight: 600,
                  fontSize: "30px",
                  mb: 3,
                  color: "#2E0C73",
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
                      color: "#2E0C73",
                    },
                    "& label": {
                      color: "#2E0C73",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#2E0C73",
                      },
                      "&:hover fieldset": {
                        borderColor: "#2E0C73",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2E0C73",
                      },
                    },
                  }}
                />

                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  required
                  sx={{
                    mt: 3,
                    input: {
                      color: "#2E0C73",
                    },
                    "& label": {
                      color: "#2E0C73",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#2E0C73",
                      },
                      "&:hover fieldset": {
                        borderColor: "#2E0C73",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#2E0C73",
                      },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePassword}
                          edge="end"
                          sx={{ color: "#2E0C73" }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  className="signin-button"
                  type="submit"
                  sx={{
                    color: "white",
                    mt: "30px",
                    p: "10px",
                    width: "100%",
                    backgroundColor: "#2E0C73",
                    "&:hover": {
                      backgroundColor: "rgb(0, 59, 111)",
                    },
                  }}
                >
                  Login
                </Button>
              </form>

              <Typography
                sx={{
                  fontSize: "15px",
                  mt: 4,
                  textAlign: "center",
                  color: "black",
                }}
              >
                Don't have an account?
                <a href="/signup" className="register-link">
                  Register
                </a>
              </Typography>
            </Paper>
          </Box>
        </div>
         <div className=" login-img">
             <h2 className="login-heading">Sign in to unlock exclusive deals and offers!</h2>
          <img
            src={loginimg}
            alt="login"
            style={{ height: "630px", width: "550px", bordertopleftradius: "15px",
    borderbottomleftradius: "15px" }}
          />
          
        </div>
      </div>
    </div>
  );
};

export default Signin;
