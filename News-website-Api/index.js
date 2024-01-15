require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const newsRoutes = require('./Routes/newsRoutes');
const userRoutes = require("./Routes/UserRoute");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

// Enable CORS for specific origins, replace '*' with your frontend URL
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // Apply CORS middleware

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
app.use(userRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
