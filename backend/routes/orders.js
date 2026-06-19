import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST - Place order (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, phone, city, profession, furnitureType, message } = req.body;
    const order = await Order.create({
      userId: req.user.id,
      name, phone, city, profession, furnitureType, message,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET - Get my orders (protected)
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;