const axios = require('axios');
const BusinessNews = require('../Models/businessNewsModel');

module.exports = {
  fetchAndStoreBusinessNews: async function (req, res) {
    try {
      const apiKey = process.env.NEWSAPI_API_KEY;
      const responseBusiness = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`);
      const articlesBusiness = responseBusiness.data.articles.map(item => ({
        sourceName: item.source.name,
        author: item.author,
        title: item.title,
        description: item.description,
        url: item.url,
        urlToImage: item.urlToImage,
        publishedAt: item.publishedAt,
      }));

      await BusinessNews.insertMany(articlesBusiness);
      res.status(200).json({ message: 'Business news saved to MongoDB' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  getAllBusinessNews: async function (req, res) {
    try {
      const allBusinessNews = await BusinessNews.find({});
      res.status(200).json({ success: true, data: allBusinessNews });
    } catch (err) {
      console.error('Error fetching Business news:', err);
      res.status(500).json({ error: 'Server error', message: err.message });
    }
  }
};
