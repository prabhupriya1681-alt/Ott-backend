import Plan from "../models/Plan.js";
export const createPlan = async (req, res) => { try { res.status(201).json(await Plan.create(req.body)); } catch(e){ res.status(500).json({message:e.message}); } };
export const getPlans = async (req, res) => { try { res.json(await Plan.find().sort({ price: 1 })); } catch(e){ res.status(500).json({message:e.message}); } };
export const updatePlan = async (req, res) => { try { res.json(await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true })); } catch(e){ res.status(500).json({message:e.message}); } };
export const deletePlan = async (req, res) => { try { await Plan.findByIdAndDelete(req.params.id); res.json({success:true}); } catch(e){ res.status(500).json({message:e.message}); } };
