// components/cart/Cart.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../Carts/Cartcontext';
import { FaMinusCircle } from "react-icons/fa";
import { Alert, Snackbar } from '@mui/material';
import "./Cart.css"

const Cart = () => {
  const { cartItems,removeFromCart } = useContext(CartContext);

    const [openSnackbar, setOpenSnackbar] = useState(false);

  const totalAmount=cartItems.reduce((total,item)=>total+item.price*item.quantity,0);
  
  const handlePlaceOrder=()=>{
    setOpenSnackbar(true);
  }
  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id}  className="item-container"style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <div>
            <img className='item-image' src={item.image} alt="image"></img>
            <h3>{item.title}</h3>
            <p>Price: ₹{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            </div>
            <div>
             <button
              onClick={() => removeFromCart(item.id)}
              style={{ padding: "5px 10px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
            <FaMinusCircle />
            </button>
            </div>

          

                    
          </div>
        ))
      )}

       <h3>Total: ₹{totalAmount}</h3>
         <button
            onClick={handlePlaceOrder}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              backgroundColor: "green",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Place Order
          </button>

            <Snackbar
                            open={openSnackbar}
                            autoHideDuration={3000}
                            onClose={() => setOpenSnackbar(false)}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            sx={{ top: '80px !important' }}
                          >
                            <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                              Are you confirm to place order
                            </Alert>
                          </Snackbar>
    </div>
  );
};

export default Cart;
