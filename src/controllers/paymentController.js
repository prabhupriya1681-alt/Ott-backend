import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";
import Plan from "../models/Plan.js";
import User from "../models/User.js";
import { calcEndDate } from "../utils/subscription.js";

const razor = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

export const createOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    const amountPaise = Math.round(plan.price * 100);
    const r = await razor.orders.create({ amount: amountPaise, currency: plan.currency, receipt: `rcpt_${Date.now()}` });
    await Order.create({ user: req.user._id, plan: plan._id, amount: plan.price, currency: plan.currency, status: "created", razorpayOrderId: r.id });
    res.json({ key: process.env.RAZORPAY_KEY_ID, orderId: r.id, amount: amountPaise, currency: plan.currency, plan });
  } catch (e) { res.status(500).json({ message: e.message }); }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (expected !== razorpay_signature) { order.status="failed"; await order.save(); return res.status(400).json({ message: "Signature invalid" }); }
    order.status = "paid"; order.razorpayPaymentId = razorpay_payment_id; order.razorpaySignature = razorpay_signature; await order.save();
    const plan = await Plan.findById(planId);
    const user = await User.findById(order.user);
    const start = new Date(); const end = new Date(start); end.setDate(end.getDate() + plan.durationDays);
    user.subscription = { active: true, plan: plan._id, start, end }; await user.save();
    res.json({ success: true, subscription: user.subscription });
  } catch (e) { res.status(500).json({ message: e.message }); }
};
