import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Import routes
import authRoutes from "./src/routes/authRoutes.js";
import movieRoutes from "./src/routes/movieRoutes.js";
import seriesRoutes from "./src/routes/seriesRoutes.js";
import planRoutes from "./src/routes/planRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect Database

// Middlewares
app.use(
  cors({
    // Add your Vercel frontend URL here
    origin: [
      "https://ott-forntend-30wbrmpu4-ott-app.vercel.app",
      "http://localhost:5173", // Keep this for local testing
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Static files
app.use("/uploads", express.static(join(__dirname, "uploads")));

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
