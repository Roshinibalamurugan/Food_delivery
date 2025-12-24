import express from "express";
import jwt from "jsonwebtoken";
import Order from "../models/order.js";
const router = express.Router();

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};


router.post("/", async (req, res) => {
  try {
    const {
      deliveryAddress,
      contactNumber,
      paymentMethod,
      cartItems,
      subTotal,
      tax,
      deliveryFee,
      total,
    } = req.body;

    const newOrder = new Order({
      deliveryAddress,
      contactNumber,
      paymentMethod,
      cartItems,
      subTotal,
      tax,
      deliveryFee,
      total,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Error placing order. Please try again." });
  }
});


router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders." });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Error updating order." });
  }
});

export default router;
