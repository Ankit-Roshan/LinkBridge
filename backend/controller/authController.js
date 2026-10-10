const bcrypt = require("bcrypt")
const User = require("../models/User")
const asyncHandler = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiError")

const registerUser = asyncHandler(async (req,res)=>{

    const{name,email,password}= req.body

    const existingUser = await User.findOne({email})
    
    if(existingUser){
        throw new ApiError(409,"User already exist karta hai")
    }
    const hassedPassword = await bcrypt.hash(password,10)

const createUser = await User.create({
    name :name,
    email: email,
    password: hassedPassword
})

if(!createUser){
    throw new ApiError(403, "User not created")
}

})