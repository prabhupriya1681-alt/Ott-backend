import express from "express";
// 'isAdmin' is removed from here because we are not using it anymore
import { protect } from "../middleware/auth.js"; 
import { 
    createMovie, 
    getMovies, 
    getMovie, 
    updateMovie, 
    deleteMovie 
} from "../controllers/movieController.js";

const router = express.Router();

// 'isAdmin' middleware is removed from the routes below to allow any logged-in user 
// to create, update, or delete movies.

router.post("/", protect, createMovie);
router.get("/", getMovies);
router.get("/:id", getMovie);
router.put("/:id", protect, updateMovie);
router.delete("/:id", protect, deleteMovie);

export default router;
