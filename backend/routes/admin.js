import express from "express";
import Order from "../models/Order.js";
import Reservation from "../models/Reservation.js";

const router = express.Router();

const ADMIN_KEY = "wooders-admin-secret-2024";

const adminAuth = (req, res, next) => {
  const key = req.headers["admin-key"];
  if (key !== ADMIN_KEY) {
    return res.status(401).json({ message: "Admin access denied" });
  }
  next();
};

// GET all orders
router.get("/orders", adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET all reservations
router.get("/reservations", adminAuth, async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE order status
router.put("/orders/:id", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE reservation status
router.put("/reservations/:id", adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;