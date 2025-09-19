import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <h2 className='footer-title'>K-Eats</h2>
                <p>© 2025 K-Eats. All rights reserved. Crafted with love to serve you better</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />

                </div>

            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>privcy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-9490830890</li>
                    <li>karthik8maguluri@gmail.com</li>
                </ul>


            </div>
        </div>
        <hr />
        <p className='footer-copyright'>
            copyright © 2025 K-Eats. All rights reserved.
        </p>
    </div>
  )
}

export default Footer
