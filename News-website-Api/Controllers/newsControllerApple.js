const axios = require('axios');
const AppleNews = require('../Models/appleNewsModel');

module.exports = {
  fetchAndStoreAppleNews: async function (req, res) {
    try {
      const apiKey = process.env.NEWSAPI_API_KEY;
      const responseApple = await axios.get(`https://newsapi.org/v2/everything?q=apple&apiKey=${apiKey}`);
      const articlesApple = responseApple.data.articles.map(item => ({
        sourceName: item.source.name,
        author: item.author,
        title: item.title,
        description: item.description,
        url: item.url,
        urlToImage: item.urlToImage,
        publishedAt: item.publishedAt,
      }));

      await AppleNews.insertMany(articlesApple);
      res.status(200).json({ message: 'Apple news saved to MongoDB' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  getAllAppleNews: async function (req, res) {
    try {
      const allAppleNews = await AppleNews.find({});
      res.status(200).json({ success: true, data: allAppleNews });
    } catch (err) {
      console.error('Error fetching Apple news:', err);
      res.status(500).json({ error: 'Server error', message: err.message });
    }
  }
};
