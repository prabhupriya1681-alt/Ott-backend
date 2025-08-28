import express from "express";
import { protect, isAdmin } from "../middleware/auth.js";
import { createPlan, getPlans, updatePlan, deletePlan } from "../controllers/planController.js";
const router = express.Router();
router.get("/", getPlans);
router.post("/", protect, isAdmin, createPlan);
router.put("/:id", protect, isAdmin, updatePlan);
router.delete("/:id", protect, isAdmin, deletePlan);
export default router;
