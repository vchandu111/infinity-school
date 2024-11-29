const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  company_name: { type: String, required: true },
  company_avatar: String,
  job_description: { type: String, required: true },
  salary: Number,
  place: String,
  skills: [String],
  job_type: String,
  work_mode: String,
  experience_level: String,
  job_title: { type: String, required: true },
  userId: String,
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
