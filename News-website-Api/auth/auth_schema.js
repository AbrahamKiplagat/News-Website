const Joi = require('joi');
const joi = require('joi');
  const authSchema = joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().min(6).required(),

  })
  module.exports ={authSchema}
  //modified on user.js