import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await Category.insertMany([
  { name: "Bed", icon: "🛏️" },
  { name: "Sofa", icon: "🛋️" },
  { name: "Room", icon: "🏠" },
  { name: "Kitchen", icon: "🍳" },
  { name: "Table", icon: "🪑" },
  { name: "Door", icon: "🚪" },
  { name: "Vanity", icon: "🪞" },
  { name: "Wardrobe", icon: "👔" },
  { name: "Chair", icon: "🪑" },
  { name: "Other", icon: "✨" },
]);

console.log("✅ Categories seeded!");
mongoose.disconnect();