const axios = require('axios');
const TeslaNews = require('../Models/teslaNewsModel');

module.exports = {
  fetchAndStoreTeslaNews: async function (req, res) {
    try {
      const apiKey = process.env.NEWSAPI_API_KEY;
      const responseTesla = await axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2023-11-09&sortBy=publishedAt&apiKey=${apiKey}`);
      const articlesTesla = responseTesla.data.articles.map(item => ({
        sourceName: item.source.name,
        author: item.author,
        title: item.title,
        description: item.description,
        url: item.url,
        urlToImage: item.urlToImage,
        publishedAt: item.publishedAt,
      }));

      await TeslaNews.insertMany(articlesTesla);
      res.status(200).json({ message: 'Tesla news saved to MongoDB' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },
  
  getAllTeslaNews: async function (req, res) {
    try {
      const allTeslaNews = await TeslaNews.find({});
      res.status(200).json({ success: true, data: allTeslaNews });
    } catch (err) {
      console.error('Error fetching Tesla news:', err);
      res.status(500).json({ error: 'Server error', message: err.message });
    }
  }
};
