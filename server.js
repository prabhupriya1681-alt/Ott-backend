import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

// Import routes with corrected paths
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import seriesRoutes from "./routes/seriesRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();

const app = express();

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect Database (Assuming you have this logic elsewhere)

// Middlewares
app.use(
  cors({
    // Add your Vercel frontend URL and localhost for testing
    origin: [
      "https://ott-forntend-30wbrmpu4-ott-app.vercel.app", // Your deployed frontend
      "http://localhost:5173", // For local development
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Static files (Adjust path if needed, assuming 'uploads' is in root)
app.use("/uploads", express.static(join(__dirname, "..", "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/series", seriesRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/payments", paymentRoutes);

// Health check
app.get("/", (req, res) => res.json({ ok: true }));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
