const user = require('../models/User');
const {StatusCode} = require('http-status-codes')
const { BadRequestError, UnauthenticatedError} = require('../errors')

const  register = async(req,res)=>{
        const User = await user.create({...req.body});
        const token = User.createJWT();
        res.status(200).json({user:{name:User.name},token});
    
}

const  login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            throw new BadRequestError("please provide a email and password");
        }
        
        const User = await user.findOne({email});
        if(!User){
            throw new un("invalid credential");
        }
        const comparepassword = User.comparepassword(password);
        if(!comparepassword){
            throw new UnauthenticatedError("please valid password");
        }
        const token = User.createJWT();
        res.status(200).json({user:{name:User.name},token});
    } catch (error) {
        throw new BadRequestError(error);
    }
   
}

module.exports = {register,login}