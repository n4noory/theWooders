import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  designTitle: { type: String, required: true },
  category:    { type: String, required: true },
  imageSrc:    { type: String },
  size:        { type: String },
  color:       { type: String },
  notes:       { type: String },
  status:      { type: String, default: "Reserved" },
}, { timestamps: true });

export default mongoose.model("Reservation", ReservationSchema);