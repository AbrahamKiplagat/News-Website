const mongoose = require('mongoose');

const techCrunchNewsSchema = new mongoose.Schema({
  sourceName: String,
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
}, { collection: 'techcrunch-news' });

const TechCrunchNews = mongoose.model('TechCrunchNews', techCrunchNewsSchema);

module.exports = TechCrunchNews;
