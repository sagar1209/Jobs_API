const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customeerror = {
     statusCode:err.statusCode||StatusCodes.INTERNAL_SERVER_ERROR,
     msg:err.message||"some thin what wrong please try again"
  }
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if(err.name === 'ValidationError'){
     customeerror.msg = Object.values(err.errors).map((item)=> item.message).join(',');
     customeerror.statusCode = 400
  }
  if(err.code && err.code===11000){
    customeerror.statusCode = 400,
    customeerror.msg = `Duplicate valued enterd for ${Object.keys(err.keyValue)} field, please choose another value`
  }
  if(err.name==='CastError'){
    customeerror.msg =  `No item found with id : ${err.value} `,
    customeerror.statusCode = 404
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
  return res.status(customeerror.statusCode).json({err:customeerror.msg})
}

module.exports = errorHandlerMiddleware
