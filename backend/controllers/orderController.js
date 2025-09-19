import dotenv from "dotenv";
dotenv.config();

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing order
const placeOrder = async (req, res) => {
  const frontend_url = "https://food-del2-frontend2-9jqe.onrender.com/";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // empty cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // stripe line items
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // add delivery charge
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2000,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.json({ success: false, message: "Error" });
  }
};

// verify payment
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "Order Success",
      });
      res.json({ success: true, message: "Paid & Order Success" });
    } else {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: false,
        status: "Payment Failed",
      });
      res.json({ success: false, message: "Not Paid, Order Failed" });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};
const userOrders = async(req,res)=>{
  try {
    const orders=await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }

}
//Listing orders for admin panel
const listOrders=async(req,res)=>{
  try {
    const orders= await orderModel.find({});
    res.json({success:true,data:orders});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
}
//api for updatin order status 
const updateStatus = async(req,res)=>{
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
    res.json({sucess:true,message:"Status updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }


}
export { placeOrder, verifyOrder,userOrders,listOrders,updateStatus };
