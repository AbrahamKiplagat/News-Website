const express = require("express");
const routes = express.Router();
const userController = require('../Controllers/userController');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const User = require("../Models/user");
const { verifyAcccessToken } = require("../Helpers/jwt_helper");

// Define the registration route
routes.post('/register', userController.registerUser);
routes.post('/login', userController.login);
routes.post('/refreshtoken', userController.login);

routes.get('/register'), userController.getRegisteredUser

module.exports = routes;
