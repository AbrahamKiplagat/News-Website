const express = require('express');
const router = express.Router();
const newsControllerTesla = require('../Controllers/newsControllerTesla');
const newsControllerApple = require('../Controllers/newsControllerApple');
const newsControllerBusiness = require('../Controllers/newsControllerBusiness');
const newsControllerTechCrunch = require('../Controllers/newsControllerTechCrunch');

// Endpoints for Tesla news
router.get('/fetch-tesla-news', newsControllerTesla.fetchAndStoreTeslaNews);
router.get('/tesla-news', newsControllerTesla.getAllTeslaNews);

// Endpoints for Apple news
router.get('/fetch-apple-news', newsControllerApple.fetchAndStoreAppleNews);
router.get('/apple-news', newsControllerApple.getAllAppleNews);

// Endpoints for Business news
router.get('/fetch-business-news', newsControllerBusiness.fetchAndStoreBusinessNews);
router.get('/business-news', newsControllerBusiness.getAllBusinessNews);
router.get('/fetch-techcrunch-news', newsControllerTechCrunch.fetchAndStoreTechCrunchNews); // Endpoint to fetch and store TechCrunch news
router.get('/techcrunch-news', newsControllerTechCrunch.getAllTechCrunchNews); // Endpoint to get all TechCrunch news
module.exports = router;
