const bcrypt = require("bcrypt")
const User = require("../models/User")
const asyncHandler = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiError")
const jwt = require("jsonwebtoken")

const { TokenExpiredError } = require("jsonwebtoken")

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body

    if (!name || !name.trim() || !email || !password) {
        throw new ApiError(400, "Name, email aur password required hain")
    }
    const cleanName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        throw new ApiError(400, "Please provide a valid email");
    }


    const existingUser = await User.findOne({ email: normalizedEmail })

    if (existingUser) {
        throw new ApiError(409, "User already exist karta hai")
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const createUser = await User.create({
        name: cleanName,
        email: normalizedEmail,
        password: hashedPassword
    })

    if (!createUser) {
        throw new ApiError(403, "User not created")
    }

    res.status(201).json({
        success: true,
        message: "User registered successfully"
    })

})

const loginUser = asyncHandler(async (req,res)=>{
    const{email,password} = req.body

    const user = await User.findOne({email})
    
    if(!user){
        throw new ApiError(401,"user nahi mila")
    }
    const checkPassword = await bcrypt.compare(password,user.password)

    if(!checkPassword){
        throw new ApiError(401,"invalid Credintials")
    }
const token = await jwt.sign({
     userId: user.id,
     role:user.role
},
process.env.JWT_SECRET,
{
   expiresIn: "1h" 
}
)

if(!token){
        throw new ApiError(500,"Server ki galti")
}

res.status(200).json({
    message:"Login successfull",
    token
})

})





module.exports = {registerUser,
                    loginUser
}