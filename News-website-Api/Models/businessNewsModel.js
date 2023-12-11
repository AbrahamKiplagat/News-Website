const mongoose = require('mongoose');

const businessNewsSchema = new mongoose.Schema({
  sourceName: String,
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
}, { collection: 'business-news' });

const BusinessNews = mongoose.model('business-news', businessNewsSchema);

module.exports = BusinessNews;
