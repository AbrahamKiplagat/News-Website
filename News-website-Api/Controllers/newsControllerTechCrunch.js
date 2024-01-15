const axios = require('axios');
const TechCrunchNews = require('../Models/techCrunch'); // or require('../Models/techcrunchNewsModel');


module.exports = {
  fetchAndStoreTechCrunchNews: async function (req, res) {
    try {
      const apiKey = process.env.NEWSAPI_API_KEY;
      
      const responseTechCrunch = await axios.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`);
      const articlesTechCrunch = responseTechCrunch.data.articles.map(item => ({
        sourceName: item.source.name,
        author: item.author,
        title: item.title,
        description: item.description,
        url: item.url,
        urlToImage: item.urlToImage,
        publishedAt: item.publishedAt,
      }));

      await TechCrunchNews.insertMany(articlesTechCrunch);
      res.status(200).json({ message: 'TechCrunch news saved to MongoDB' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  getAllTechCrunchNews: async function (req, res) {
    try {
      const allTechCrunchNews = await TechCrunchNews.find({});
      res.status(200).json({ success: true, data: allTechCrunchNews });
    } catch (err) {
      console.error('Error fetching TechCrunch news:', err);
      res.status(500).json({ error: 'Server error', message: err.message });
    }
  }
};
