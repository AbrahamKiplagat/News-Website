const mongoose = require('mongoose');

const appleNewsSchema = new mongoose.Schema({
  sourceName: String,
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
}, { collection: 'apple-news' });

const AppleNews = mongoose.model('apple-news', appleNewsSchema);

module.exports = AppleNews;
