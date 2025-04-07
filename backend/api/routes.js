const express = require('express');
const router = express.Router();
const FunctionModel = require('../models/Function');

// Create function
router.post('/', async (req, res) => {
  try {
    const func = new FunctionModel(req.body);
    await func.save();
    res.status(201).json(func);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  const functions = await FunctionModel.find();
  res.json(functions);
});

// Get one
router.get('/:id', async (req, res) => {
  const func = await FunctionModel.findById(req.params.id);
  res.json(func);
});

// Update
router.put('/:id', async (req, res) => {
  const updated = await FunctionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
  await FunctionModel.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;

