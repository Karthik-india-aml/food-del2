import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext);
  const navigate = useNavigate();

  // Ensure total is a number and formatted as string with 2 decimals
  const subtotal = Number(getTotalCartAmount()) || 0;
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const total = subtotal + deliveryFee;

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          const quantity = cartItems[item._id] || 0;
          if (quantity > 0) {
            const price = Number(item.price) || 0;
            const totalItemPrice = price * quantity;

            return (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url+"/images/"+item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${price.toFixed(2)}</p>
                  <p>{quantity}</p>
                  <p>${totalItemPrice.toFixed(2)}</p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className='cross'
                    style={{ cursor: 'pointer', color: 'red', fontWeight: 'bold' }}
                  >
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${deliveryFee.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${total.toFixed(2)}</b>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        <div className='cart-promocode'>
          <p>If you have promo code, Enter it here</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
