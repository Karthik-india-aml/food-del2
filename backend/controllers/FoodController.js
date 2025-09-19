import foodModel from "../models/FoodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "Image file is required" });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.error("Add food error:", error);
    res.json({ success: false, message: "Error adding food" });
  }
};

// All food list
const listFood = async (req, res) => {
  try {
    const food = await foodModel.find({});
    res.json({ success: true, data: food });
  } catch (error) {
    console.error("List food error:", error);
    res.json({ success: false, message: "Error fetching food list" });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    // Delete the image file safely
    const imagePath = `uploads/${food.image}`;
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.warn("File deletion failed:", err.message);
      }
    });

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Remove food error:", error);
    res.json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood };
