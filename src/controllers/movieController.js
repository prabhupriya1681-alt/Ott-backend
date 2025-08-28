import Movie from "../models/Movie.js";
export const createMovie = async (req, res) => {
  try { const movie = await Movie.create({ ...req.body, createdBy: req.user._id }); res.status(201).json(movie); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
export const getMovies = async (req, res) => {
  try {
    const { q, premium } = req.query;
    const f = {};
    if (q) f.title = new RegExp(q, "i");
    if (premium === "true") f.premium = true;
    if (premium === "false") f.premium = false;
    res.json(await Movie.find(f).sort({ createdAt: -1 }));
  } catch (e) { res.status(500).json({ message: e.message }); }
};
export const getMovie = async (req, res) => {
  try { const m = await Movie.findById(req.params.id); if (!m) return res.status(404).json({ message: "Not found" }); res.json(m); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
export const updateMovie = async (req, res) => {
  try { res.json(await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
export const deleteMovie = async (req, res) => {
  try { await Movie.findByIdAndDelete(req.params.id); res.json({ success: true }); }
  catch (e) { res.status(500).json({ message: e.message }); }
};
