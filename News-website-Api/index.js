require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const newsRoutes = require('./Routes/newsRoutes');


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api/news', newsRoutes); // Make sure this line comes after defining routes in newsRoutes.js

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
