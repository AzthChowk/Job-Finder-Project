import mongoose from "mongoose";

export const locationSchema = new mongoose.Schema({
  street: {
    type: String,
    minlength: 3,
    maxlength: 55,
    trim: true,
    required: true,
  },
  state: {
    type: String,
    minlength: 3,
    maxlength: 55,
    trim: true,
    required: true,
  },
  country: {
    type: String,
    minlength: 3,
    maxlength: 55,
    trim: true,
    required: true,
  },
  zip: {
    type: String,
    minlength: 4,
    maxlength: 6,
    trim: true,
    required: true,
  },
});
