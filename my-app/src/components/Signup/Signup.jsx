import React from 'react';
import './Signup.css';
import signup from "../../assets/signup.jpg";
import { GiPolarStar } from "react-icons/gi";

const Signup = () => {
  return (
    <div className="signup-container">
        <div className='signup-container1'>
      <div className="left-section">
        <div className="label-top">Welcome to SparkZon</div>
        <div className="text-bottom">Elevate Your Shopping Experience with us</div>
        <img src={signup} alt="Nike Athlete" />
      </div>

      <div className="right-section">
        <div className="star-icon"><GiPolarStar /></div>
        <h2>Get access to your Orders, Wishlist and Recommendations.</h2>
        <p>  Signup and enjoy the greatest deals</p>

        <form className='signup-form'>
          <div className="form-row">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <div className="button-row">
            <button type="submit" className="btn-light">Sign up now</button>
            <button type="button" className="btn-dark">Explore Collection</button>
          </div>
        </form>

       
      </div>
      </div>
    </div>
  );
};

export default Signup;




