import React, { useState, useContext, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';   // ✅ Added useNavigate
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const Navbar = ({ setShowLogin }) => {
  const [activeMenu, setActiveMenu] = useState('home');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();   // ✅ Initialize navigate

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className='navbar'>
        <h1 className='navbar-title'>K-Eats</h1>

        <ul className='navbar-menu'>
          <li>
            <Link
              to="/"
              className={activeMenu === 'home' ? 'active' : ''}
              onClick={() => setActiveMenu('home')}
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#explore-menu"
              className={activeMenu === 'menu' ? 'active' : ''}
              onClick={() => setActiveMenu('menu')}
            >
              Menu
            </a>
          </li>
          <li>
            <a
              href="#app-download"
              className={activeMenu === 'mobile-app' ? 'active' : ''}
              onClick={() => setActiveMenu('mobile-app')}
            >
              Mobile App
            </a>
          </li>
          <li>
            <a
              href="#footer"
              className={activeMenu === 'contact-us' ? 'active' : ''}
              onClick={() => setActiveMenu('contact-us')}
            >
              Contact Us
            </a>
          </li>
        </ul>

        <div className='navbar-right'>
          <img src={assets.search_icon} alt="search" className="icon" />

          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} alt="cart" className="icon" />
            </Link>
            {getTotalCartAmount() > 0 && <div className="dot"></div>}
          </div>

          {!token ? (
            <button className="sign-in-btn" onClick={() => setShowLogin(true)}>
              Sign in
            </button>
          ) : (
            <div className='navbar-profile-wrapper' ref={dropdownRef}>
              <div
                className='navbar-profile'
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <img src={assets.profile_icon} alt="profile" className="profile-icon" />
              </div>

              {showDropdown && (
                <ul className="nav-profile-dropdown">
                  <li onClick={() => navigate('/my-orders')}>
                    <img src={assets.bag_icon} alt="orders" />
                    <p>Orders</p>
                  </li>
                  <hr />
                  <li
                    onClick={() => {
                      setToken(null);
                      localStorage.removeItem('token'); 
                      setShowDropdown(false);
                    }}
                  >
                    <img src={assets.logout_icon} alt="logout" />
                    <p>Logout</p>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      <hr className="navbar-separator" />
    </>
  );
};

export default Navbar;
