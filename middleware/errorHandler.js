const errorHandler = (err,req,res,next)=>{
    req.status(err.statusCode).json({
        message: err.message
    })
}