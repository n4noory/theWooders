import express from "express";
import Reservation from "../models/Reservation.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST - Create reservation (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { designTitle, category, imageSrc, size, color, notes } = req.body;
    const reservation = await Reservation.create({
      userId: req.user.id,
      designTitle, category, imageSrc, size, color, notes,
    });
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET - Get my reservations (protected)
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;