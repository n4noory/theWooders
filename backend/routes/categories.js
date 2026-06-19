import express from "express";
import Category from "../models/Category.js";

const router = express.Router();

// GET all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST — Admin add category
router.post("/", async (req, res) => {
  try {
    const { name, icon } = req.body;
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category already exists" });
    const category = await Category.create({ name, icon });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE — Admin delete category
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;