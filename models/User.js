
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required :[true,"please provie name"],
        maxlength:30,
        minlength:3,
    },
    email:{
        type: String,
        required:[true,"please provide email"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please provide a valid email"],
        unique:true,
    },
    password:{
        type:String,
        require:[true,' please provide a password'],
        minlength:4,
    },
})

userSchema.pre('save',async function(next){
    const salt =await  bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})  

userSchema.methods.createJWT = function(){
    return jwt.sign({UserId:this._id,username:this.name},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

userSchema.methods.comparepassword = function(currentpassword){
    const ismatch = bcrypt.compare(currentpassword,this.password);
    return ismatch;
}

module.exports = mongoose.model('user',userSchema);