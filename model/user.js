import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already exist"],
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    resetOtp:{
        type: Number,
        select: false
    },
    resetTime:{
        type: Date,
        select: false
    },
    task: [
        {
            taskId :{
                type: mongoose.Schema.Types.ObjectId,
                ref: "task"
            },
            status: {
                type: String,
                default: "inProgress"
            }
        }
    ]
})

userSchema.pre("save", async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
})

userSchema.methods.macthPassword = async function(password){
    console.log(password, this.password)
    const isPasswordMatch = await bcrypt.compare(password, this.password)
    return isPasswordMatch
}

userSchema.methods.genrateToken = async function(){
    const token = await jwt.sign({_id:this._id}, process.env.JWT_SECRET)
    return token
}

mongoose.models = {}

export const user = mongoose.model("user", userSchema)
