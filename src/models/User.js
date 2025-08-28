import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  subscription: {
    active: { type: Boolean, default: false },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", default: null },
    start: { type: Date },
    end: { type: Date }
  }
}, { timestamps: true });

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function(pwd) { return bcrypt.compare(pwd, this.password); };

export default mongoose.model("User", userSchema);
