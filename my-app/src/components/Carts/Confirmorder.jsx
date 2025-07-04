import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './Confirmorder.css';


const Confirmorder = () => {
 const location = useLocation();
const selectedItems = location.state?.selectedItems || [];
const totalAmount = location.state?.totalAmount || 0;
const platformfee = location.state?.platformfee || 0;
const Totalprice = location.state?.Totalprice || 0;

return (
    <div className="confirm-container">
      <div>
      <div className="delivery-address">
        <div className='add-address'>
        <h2 style={{fontSize:"17px",margin:"5px"}}>Select delivery Address</h2>
        <button className='add-new'>Add New Address</button>
        </div>
        <h3 style={{fontSize:"16px",margin:"5px",padding:"5px"}}>Default Address</h3>
        <div className="address-card">
          <strong style={{fontSize:"16px",margin:"5px"}}>Shuruthi</strong> <span className="badge">HOME</span>
          <p style={{fontSize:"16px",margin:"5px"}}>1752,shakthi nagar north, north pookollai ramanadhapuram panjayathu, Eswari nagar<br />Thanjavur, Tamil Nadu - 613004</p>
          <p style={{fontSize:"16px",margin:"5px"}}>Mobile: <strong>7708518182</strong></p>
        </div>
         <div>
        <button className='add-button'>+ Add New Address</button>
      </div>
      </div>
     
      </div>

      <div>
      <div className="delivery-estimates">
        <h3 style={{fontSize:"16px",margin:"5px"}}>Delivery Estimates</h3>
        {selectedItems.map((item, idx) => (
          <div key={item.id}>
            <img src={item.image} alt={item.title} className="estimate-image" />
            <p>Estimated delivery by <strong>{idx % 2 === 0 ? '8 Jul 2025' : '6 Jul 2025'}</strong></p>
          </div>
        ))}
      </div>

      <div className="price-summary">
        <h3 style={{fontSize:"16px",margin:"5px"}}>Price Details ({selectedItems.length} Items)</h3>
        <p>Total MRP: ₹{totalAmount}</p>
       
        <p>Platform Fee: {platformfee}</p>
        <hr />
        <h2>Total Amount: ₹{Totalprice}</h2>
      </div>

     <button className="confirm-btn" >CONTINUE</button>
     </div>

    </div>
  );
};

export default Confirmorder;
