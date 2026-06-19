import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name:          { type: String, required: true },
  phone:         { type: String, required: true },
  city:          { type: String, required: true },
  profession:    { type: String },
  furnitureType: { type: String },
  message:       { type: String },
  status:        { type: String, default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);