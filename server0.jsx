const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const postRoutes = require('./src/routes/postRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

// Start server
app.listen(3001, () => {
  console.log('Server listening on port 3001');
});