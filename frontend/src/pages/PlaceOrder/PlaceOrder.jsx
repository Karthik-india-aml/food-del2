import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // ✅ FIX: import useNavigate

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();  // ✅ FIX: call it before useEffect

  // handle form input
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // place order and redirect to Stripe
  const placeOrder = async (event) => {
    event.preventDefault();

    try {
      // collect items in cart
      let orderItems = [];
      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          orderItems.push({
            ...item,
            quantity: cartItems[item._id],
          });
        }
      });

      // build order data (no userId → backend adds it from JWT)
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
      };

      // send order request with token
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        // redirect to Stripe checkout
        window.location.href = response.data.session_url;
      } else {
        alert(response.data.message || "Error while placing order");
      }
    } catch (error) {
      console.error("Frontend error:", error);
      alert("Payment failed");
    }
  };

  // redirect if not logged in or cart empty
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, getTotalCartAmount, navigate]); // ✅ FIX: include navigate in deps

  return (
    <div>
      <form className="place-order" onSubmit={placeOrder}>
        {/* LEFT SIDE */}
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-feilds">
            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First name"
            />
            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last name"
            />
          </div>
          <input
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email address"
          />
          <input
            required
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
          />
          <div className="multi-feilds">
            <input
              required
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
            />
            <input
              required
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
            />
          </div>
          <div className="multi-feilds">
            <input
              required
              name="pincode"
              onChange={onChangeHandler}
              value={data.pincode}
              type="text"
              placeholder="Pin code"
            />
            <input
              required
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>

            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
