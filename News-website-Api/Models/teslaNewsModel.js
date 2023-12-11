const mongoose = require('mongoose');

const teslaNewsSchema = new mongoose.Schema({
  sourceName: String,
  author: String,
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
}, { collection: 'tesla-news' });

const TeslaNews = mongoose.model('tesla-news', teslaNewsSchema);

module.exports = TeslaNews;
