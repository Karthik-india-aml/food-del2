import React from 'react'
import './Header.css'
import headerImg from '../../assets/header_img.png';

const Header = () => {
  return (
    <div
      className="header"
      style={{
        background: `url(${headerImg}) no-repeat`,
        backgroundSize: 'contain',
        position: 'relative',
        height: '34vw',
        margin: '30px auto'
      }}
    >
      <div className='header-contents'>
        <h2>order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and utmost care to satisfy every craving
        </p>
        <button>view-menu</button>
      </div>
    </div>
  )
}

export default Header