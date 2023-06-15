const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,"please provide a name"],
        maxlength:50
    },
    position:{
        type:String,
        required:[true,"please provide a position"],
        maxlength: 100,
    },
    status:{
        type:String,
        enum:['interview','declind','pending'],
        deafault:'pending',
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true,'please provide user']
    }
},{timestamps:true})

module.exports = mongoose.model('Job',jobSchema);

