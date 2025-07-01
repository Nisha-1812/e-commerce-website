// components/cart/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../Carts/Cartcontext';

const Cart = () => {
  const { cartItems,removeFromCart } = useContext(CartContext);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
            <h3>{item.title}</h3>
            <p>Price: ₹{item.price}</p>
            <p>Quantity: {item.quantity}</p>
             <button
              onClick={() => removeFromCart(item.id)}
              style={{ padding: "5px 10px", backgroundColor: "red", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
