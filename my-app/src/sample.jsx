// components/cart/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../Carts/Cartcontext';
import { FaMinusCircle } from "react-icons/fa";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Handle place order
  const handlePlaceOrder = () => {
    if (window.confirm("Are you sure you want to place the order?")) {
      // Add order logic here
      alert("Order placed successfully!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div
              key={item.id}
              style={{
                marginBottom: "10px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px"
              }}
            >
              <h3>{item.title}</h3>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "red",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                <FaMinusCircle />
              </button>
            </div>
          ))}

          {/* Total amount display */}
          <h3>Total: ₹{totalAmount}</h3>

          {/* Place Order button */}
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
        </>
      )}
    </div>
  );
};

export default Cart;
