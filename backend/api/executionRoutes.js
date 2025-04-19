import express from 'express'
import Execution from '../models/execution.js';

const router = express.Router();
// const Execution = require("../models/Execution");

// List latest executions
router.get('/', async (req, res) => {
    try {
      const executions = await Execution.find()
        .sort({ timestamp: -1 })
        .limit(20);
      res.json(executions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;