const mongoose = require('mongoose');

// Define the schema for the News collection
const newsSchema = new mongoose.Schema({
  sourceName: String,
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
}, { collection: 'news-web' });

// Create the News model based on the schema
const News = mongoose.model('news-web', newsSchema);

module.exports = News;
