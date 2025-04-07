require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const functionRoutes = require('./api/functionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'));

app.use('/api/functions', functionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

