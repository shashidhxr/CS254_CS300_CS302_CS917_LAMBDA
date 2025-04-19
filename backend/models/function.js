import mongoose from "mongoose";

const functionSchema = new mongoose.Schema({
  name: String,
  route: String,
  language: { type: String, enum: ['python', 'javascript'] },
  timeout: Number,
  code: String, // base64 or raw string
}, { timestamps: true });

const FunctionModel = mongoose.model('Function', functionSchema);

export default FunctionModel
