import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const VerifyPage = () => {
  const { url, token } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const success = query.get("success");
    const orderId = query.get("orderId");

    const verifyPayment = async () => {
      try {
        await axios.post(
          `${url}/api/order/verify`,
          { orderId, success },
          { headers: { token } }
        );
        navigate("/my-orders", { state: { fromStripe: success === "true" } });
      } catch (err) {
        console.error(err);
        navigate("/my-orders");
      }
    };

    verifyPayment();
  }, [location, url, token, navigate]);

  return <div>Verifying your payment...</div>;
};

export default VerifyPage;
