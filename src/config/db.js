import mongoose from "mongoose";
export default async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected:", conn.connection.host);
  } catch (e) {
    console.error("Mongo error:", e.message);
    process.exit(1);
  }
}
