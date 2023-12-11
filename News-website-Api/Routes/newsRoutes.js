const express = require('express');
const router = express.Router();
const newsControllerTesla = require('../Controllers/newsControllerTesla');
const newsControllerApple = require('../Controllers/newsControllerApple');
const newsControllerBusiness = require('../Controllers/newsControllerBusiness');

// Endpoints for Tesla news
router.get('/fetch-tesla-news', newsControllerTesla.fetchAndStoreTeslaNews);
router.get('/tesla-news', newsControllerTesla.getAllTeslaNews);

// Endpoints for Apple news
router.get('/fetch-apple-news', newsControllerApple.fetchAndStoreAppleNews);
router.get('/apple-news', newsControllerApple.getAllAppleNews);

// Endpoints for Business news
router.get('/fetch-business-news', newsControllerBusiness.fetchAndStoreBusinessNews);
router.get('/business-news', newsControllerBusiness.getAllBusinessNews);

module.exports = router;
