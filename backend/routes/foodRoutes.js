import express from "express";
import Food from "../models/Food.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const food = new Food({ name, description, price, imageUrl });
    await food.save();
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ message: "Invalid food data" });
  }
});

export default router;
