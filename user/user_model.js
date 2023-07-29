import mongoose from "mongoose";

// RULE
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 155,
    unique: true,
    lowercase: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    maxlength: 10,
  },
  userType: {
    type: String,
    enum: ["Seeker", "Provider"],
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 155,
  },

  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
});

export const User = mongoose.model("User", userSchema);
