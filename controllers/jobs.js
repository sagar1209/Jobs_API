const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async(req,res)=>{
    const jobs = await Job.find({createdBy:req.user.UserId}).sort('createdAt');
    res.status(200).json({jobs,count:jobs.length});
}

const getJob =async (req,res)=>{
    const {
        user: {UserId},
        params: {id:JobId}
    } = req
   const job = await Job.findOne({_id:JobId,createdBy:UserId});
   if(!job){
      throw new NotFoundError(`NO job with id ${JobId}`)
   }
   res.status(200).json({job});
}

const createJob = async(req,res)=>{
   req.body.createdBy = await req.user.UserId;
   const job = await Job.create(req.body);    
   res.status(200).json({job});
}

const upadateJob = async(req,res)=>{
   const {
    body : {company,position},
    user : {UserId},
    params : {id:JobId}
   } = req
   if(!company || !position){
    throw new BadRequestError("company and position fields can not be empty");
   }

   const job = await Job.findOne({_id:JobId,createdBy:UserId});
   if(!job){
      throw new NotFoundError(`NO job with id ${JobId}`)
   }
   const update = await Job.findByIdAndUpdate({_id:JobId,createdBy:UserId},req.body,{new:true,runValidators:true});
   res.status(200).json({update});
}
const deleteJob = async(req,res)=>{
        const {
            user:{UserId},
            params:{id:JobId}
         } = req
         const job = await Job.findOne({_id:JobId,createdBy:UserId});
         if(!job){
          throw new NotFoundError(`NO job with id ${JobId}`)
         }
         const delet = await Job.findByIdAndDelete({_id:JobId,createdBy:UserId});
         res.status(200).send("Delete Job");
  
}

module.exports = {getAllJobs,getJob,createJob,upadateJob,deleteJob}
