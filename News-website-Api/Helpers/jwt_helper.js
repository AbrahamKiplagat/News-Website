// Require the jsonwebtoken library
const JWT = require("jsonwebtoken")

// Require the http-errors library for creating HTTP error objects
const createError = require("http-errors")

// Require the user model
const User = require("../Models/user")

// Create an object called 'exports' that contains methods for generating and signing access tokens
module.exports ={

 // Define a method called 'signAccessTocken' that takes in a user ID as a parameter
 signAccessTocken:(UserId)=>{
    
    // Return a new promise that will eventually resolve to a signed access token or reject with an error
    return new Promise((resolve,reject)=>{
      
      // Define the payload of the token. In this case, it's an empty object
      const payload = {}
      
      // Get the secret for signing the token from the environment variables
      const secret = process.env.ACCESS_TOKEN_SECRET;
      
      // Define the options for signing the token
      const options = {
        expiresIn: "2m", // The token will expire in 1 hour
        issuer: "EddTechnologies.com", // The issuer of the token
        audience: UserId, // The audience of the token, i.e., the user ID
      }
     
      // Sign the token with the payload, secret, and options
      JWT.sign(payload, secret, options, (error,token) =>{
        
        // If there is an error while signing the token
        if(error){
          
          // Log the error message
          console.log(error.message)
          
          // Reject the promise with an HTTP error object with a status code of 500
          reject(createError.InternalServerError());
        }
        
        // If there is no error, resolve the promise with the signed access token
        resolve(token)
      })
     })
 },
 verifyAcccessToken:(req, res,next)=>{
  if(!req.headers["authorization"]) return next (createError.Unauthorized());
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split('');
  const token = bearerToken[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,payload)=>{
    if(err) {
    return next(createError.Unauthorized())
    }
    req.payload= payload;
    next()
  })

 },
 signRefreshToken: (UserId)=>{
  return new Promise((resolve,reject)=>{
    const payload = {}
    const secret = process.env .REFRESH_TOKEN_SECRET;
    const options ={
      expiresIn:'1y',
      issuer:"EddTechnologies.com",
      audience: UserId,

    }
    JWT.sign(payload,secret,options,(error,token)=>{
      if(error) reject(error)
      resolve(token)
    })
  })
 },
 verifyRefreshToken:(refreshToken)=>{
  JWT.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, payload)=>{
    if (err)return reject(createError.Unauthorized())
    const UserId =payload.aud;

    resolve(UserId)
  })
 }
}