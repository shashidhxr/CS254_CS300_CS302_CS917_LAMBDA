const express = require("express");
const router = express.Router();
const Execution = require("../models/Execution");

// List latest executions
router.get("/", async (req, res) => {
  const executions = await Execution.find().sort({ timestamp: -1 }).limit(20);
  res.json(executions);
});

module.exports = router;
