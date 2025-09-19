import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext); // ✅ Include setToken

  const [currState, setCurrState] = useState('Login');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [agree, setAgree] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    let endpoint = currState === 'Login' ? '/api/user/login' : '/api/user/register';
    const newUrl = url + endpoint;

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token); // ✅ Context gets updated
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === 'Sign Up' && (
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit">
          {currState === 'Sign Up' ? 'Create account' : 'Login'}
        </button>

        <div className="login-popup-condition">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            required
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
