const axios = require('axios');
const News = require('../Models/newsModel');

module.exports = {
  fetchAndStoreNews: async function (req, res) {
    try {
      const apiKey = process.env.NEWSAPI_API_KEY;
      
      // Fetch news related to 'tesla'
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

      // Fetch news related to 'apple'
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

      // Fetch country-specific news in the 'business' category (country=us&category=business)
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
// Fetch news from 'techcrunch' as per your request
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
      // Concatenate articles from different categories
      const allArticles = [...articlesTesla, ...articlesApple, ...articlesBusiness,...articlesTechCrunch];

      // Store all articles in the MongoDB collection
      await News.insertMany(allArticles);
      res.status(200).json({ message: 'News saved to MongoDB' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  getAllNews: async function (req, res) {
    try {
      const allNews = await News.find({});
      res.status(200).json({ success: true, data: allNews });
    } catch (err) {
      console.error('Error fetching news:', err);
      res.status(500).json({ error: 'Server error', message: err.message });
    }
  }
};
