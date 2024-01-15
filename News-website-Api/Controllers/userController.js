const { signAccessTocken, signRefreshToken, verifyRefreshToken } = require("../Helpers/jwt_helper");

const User = require("../Models/user");
const { authSchema } = require("../auth/auth_schema");
const createError = require('http-errors');

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      console.log("Request Body:", req.body);
  
      const result = await authSchema.validateAsync(req.body);
  
      // Ensure that req.body is defined and has the expected properties
      if (!req.body || !req.body.email) {
        throw createError.BadRequest("Invalid request body");
      }
  
      const Exists = await User.findOne({ email: req.body.email });
      if (Exists) throw createError.Conflict(`${req.body.email} is already registered`);
  
      const user = new User(req.body);
      const savedUser = await user.save();
      const accessToken = await signAccessTocken(savedUser.id);
      const refreshToken = await signRefreshToken(savedUser.id);
  
      res.status(200).send({ accessToken, refreshToken });
    } catch (error) {
      console.log(error.message);
  
      if (error.isJoi === true) error.status = 422;
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
  
      next(error);
    }
  },
  

  getRegisteredUser: async (req, res) => {
    try {
      const user = await User.find({});
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal server error" });
    }
  },
  login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      const user = await User.findOne({ email: result.email });
      if (!user) throw createError.NotFound("User Not registered");

      const accessToken = await signAccessTocken(user.id);
      const refreshToken = await signRefreshToken(user.id);

      res.status(200).send({ accessToken, refreshToken });
    } catch (error) {
      if (error.isJoi === true) return next(createError.BadRequest('Invalid User Name/Password'));
      next(error);
    }
  },
  refreshToken: async(req,res,next)=>{
    try{
      const {refreshToken} =req.body
      if (refreshToken) throw createError.BadRequest();
      const UserId = await verifyRefreshToken(refreshToken)
      const accessToken = await signAccessTocken(UserId);
      const refToken = await signRefreshToken(UserId);
      res.status(200).send({accessToken:accessToken,refreshToken:refToken});
    }catch (error) {
      next(error);
    }
  },
  GetUser: async(req,res, next)=>{
    const id = req.params.id;
    try{ 
      const user =await User.findById(id)
      if(!user){
        throw(createError(404,"user does not exist"))
      }res.status(200).send(user);
    }catch(error){
      console.log(error.message);
      if (error instanceof mongoose.CastError){
        next(createError(400,"invalid user"))
        return
      }
      next(error)
    }
  },
   UpdateUser:async(req,res, next)=>{
    try{
        const id = req.params.id;
        const update = req.body;
        const options = {new: true}
        const user = await User.findByIdAndUpdate(id,update,options)

        res.send(user);
    }catch(error) {
        console.log(error.message)
    }
  
}  ,
DeleteUser:async(req,res, next)=>{
  try{
    const id = req.params.id;
    const users = await User.findByIdAndDelete(id)
    if(!users){
      throw createError(404, "student does not exist")
    } 

    res.status(200).send(users);
  }catch(error) {
    console.log(error.message)
    if(error instanceof mongoose.CastError){
      next(createError(400, "Invalid student id"));
      return;
    }
  }
}
}