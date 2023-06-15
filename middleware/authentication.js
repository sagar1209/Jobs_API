
const jwt = require('jsonwebtoken');
const Autherror = require('../errors/unauthenticated');

const auth = async (req,res,next)=>{
    const authheader = req.headers.authorization;
    if(!authheader || !authheader.startsWith('Bearer ')){
        throw new Autherror("not token provided");
    }
    const token = authheader.split(' ')[1];
    
    try {
    const decoded = jwt.verify(token,'jwt_secret');
    const {UserId,username}= decoded;
    req.user = {UserId,username};
    next();
    } catch (error) {
        throw new Autherror(error);
    } 
}

module.exports = auth