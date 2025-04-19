// const mongoose = require("mongoose");
import mongoose from "mongoose";

const executionSchema = new mongoose.Schema({
  language: String,
  duration: Number, // in ms
  success: Boolean,
  output: String,
  error: String,
  timestamp: Date,
});

// module.exports = mongoose.model("Execution", executionSchema);
export default mongoose.model('Execution', executionSchema)