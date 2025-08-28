import express from "express";
import { body } from "express-validator";
import { register, login, me } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();
router.post("/register", body("name").notEmpty(), body("email").isEmail(), body("password").isLength({min:6}), register);
router.post("/login", login);
router.get("/me", protect, me);
export default router;
