import mongoose from "mongoose";
const planSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  durationDays: { type: Number, required: true },
  features: [String]
}, { timestamps: true });
export default mongoose.model("Plan", planSchema);
