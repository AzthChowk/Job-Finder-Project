import mongoose from "mongoose";
import { locationSchema } from "./location-model.js";

const providerJobSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 10,
    maxlength: 85,
    trim: true,
    required: true,
  },
  location: {
    type: locationSchema,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
    enum: ["entry", "mid", "senior", "none"],
    trim: true,
  },
  qualification: {
    type: String,
    required: true,
    enum: ["none", "school", "bachelor", "masters", "phd"],
    trim: true,
  },
  industryType: {
    type: String,
    required: true,
    trim: true,
  },
  jobDescription: {
    type: String,
    required: true,
    trim: true,
    minlength: 200,
    maxlength: 700,
  },
  skills: {
    type: [String],
    required: true,
  },
  responsibility: {
    type: [String],
    required: true,
  },
  benefits: {
    type: [String],
    required: true,
  },

  offeredSalary: {
    min: {
      type: Number,
      required: true,
      min: 100,
    },
    max: {
      type: Number,
      required: true,
      min: 101,
    },
  },
  jobTime: {
    type: String,
    required: true,
    trim: true,
    enum: ["part", "full"],
  },
});

// create table
export const ProviderJob = mongoose.model("ProviderJob", providerJobSchema);
