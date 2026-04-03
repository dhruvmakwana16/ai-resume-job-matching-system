const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      default: "Unknown Candidate",
    },
    skills: {
      type: [String],
      default: [],
    },
    job_skills: {
      type: [String],
      default: [],
    },
    match_score: {
      type: Number,
      default: 0,
    },
    missing_skills: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Candidate",
  candidateSchema
);