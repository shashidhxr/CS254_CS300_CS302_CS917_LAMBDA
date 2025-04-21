import express from 'express';
import FunctionModel from '../models/function.js';
import executeFunction from '../services/dockerExecutor.js'

const router = express.Router();

// 🧪 Run Function (via Docker)
router.post('/run', async (req, res) => {
  const { code, language, timeout } = req.body;

  try {
    const output = await executeFunction({ code, language, timeout });
    res.json({ output });
  } catch (err) {
    res.status(400).json({ error: err.message || err });
  }
});

// 🆕 Create Function Metadata
router.post('/', async (req, res) => {
  try {
    const func = new FunctionModel(req.body);
    await func.save();
    res.status(201).json(func);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read All Functions
router.get('/', async (req, res) => {
  try {
    const functions = await FunctionModel.find();
    res.json(functions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Function by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const func = await FunctionModel.findById(req.params.id);
//     if (!func) return res.status(404).json({ error: 'Not found' });
//     res.json(func);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Update Function
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await FunctionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Delete Function
// router.delete('/:id', async (req, res) => {
//   try {
//     await FunctionModel.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

export default router;
