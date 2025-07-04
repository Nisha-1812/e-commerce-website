
import React, { useContext, useState } from "react";
import { CartContext } from "../Carts/Cartcontext";
import { FaTags } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Alert, Checkbox, Snackbar } from "@mui/material";
import "./Cart.css";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedItems, setSelectedItems] = useState(() =>
    cartItems.map((item) => item.variantId)
  );

  const handleSelect = (variantId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(variantId)
        ? prevSelected.filter((id) => id !== variantId)
        : [...prevSelected, variantId]
    );
  };

  const totalAmount = cartItems.reduce((total, item) => {
    return selectedItems.includes(item.variantId)
      ? total + item.price * item.quantity
      : total;
  }, 0);

  const platformfee = 20;
  const Totalprice = totalAmount + platformfee;

  const handlePlaceOrder = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item to place order.");
      return;
    }

    setOpenSnackbar(true);

    setTimeout(() => {
      navigate('/confirmorder', {
        state: {
          selectedItems: cartItems.filter(item => selectedItems.includes(item.variantId)),
          totalAmount,
          platformfee,
          Totalprice
        }
      });
    }, 1500);
  };

  return (
    <div className="cart-container">
      <div className="left-cart">
        <div className="cart-address">
          <p>
            Deliver to:<strong>Shuruthi,</strong><br />
            1752, Shakthi Nagar, M.C. Road, Thanjavur
          </p>
          <button className="address-button">Change Address</button>
        </div>
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.variantId}
              className="item-container"
              style={{
                marginBottom: "10px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "10px"
              }}
            >
              <div style={{ display: "flex" }}>
                <Checkbox
                  checked={selectedItems.includes(item.variantId)}
                  onChange={() => handleSelect(item.variantId)}
                  sx={{ mr: 1 }}
                />
                <div className="cart-details">
                  <div>
                    <img className="item-image" src={item.image} alt="product" />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>
                      {item.description?.length > 60
                        ? item.description.slice(0, 60) + "..."
                        : item.description}
                    </p>
                    {item.selectedSize && <p><strong>Size:</strong> {item.selectedSize}</p>}
                    {item.selectedUnit && <p><strong>Unit:</strong> {item.selectedUnit}</p>}
                    {item.selectedcolor && <p><strong>Color:</strong> {item.selectedcolor}</p>}
                    {item.selectedmodal && <p><strong>Model:</strong> {item.selectedmodal}</p>}

                    <p>Price: ₹{item.price}</p>

                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span className="qty-display">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>

                    <p>Total price: ₹{item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => removeFromCart(item.variantId)}
                  className="place-order-button"
                >
                  <IoIosCloseCircleOutline />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="right-cart">
        <div className="coupon-section">
          <h4 className="section-title">
            <FaTags className="tag-icon" /> Apply Coupons
          </h4>
          <input type="text" placeholder="Enter coupon code" className="coupon-input" />
          <button className="apply-btn">Apply</button>
        </div>

        <div className="price-details">
          <h3 className="section-title">Price Details</h3>
          <div className="price-row">
            <span>Total MRP</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="price-row">
            <span>Platform Fee</span>
            <span>₹{platformfee}</span>
          </div>
          <hr />
          <div className="price-row total">
            <span>Total Amount</span>
            <span>₹{Totalprice}</span>
          </div>
          <button onClick={handlePlaceOrder} className="place-order-btn">
            Place Order
          </button>
        </div>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ top: "80px !important" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Are you confirm to place order
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Cart;
