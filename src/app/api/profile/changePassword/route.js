import { cookies } from "next/headers";
import connectDB from "../../../../../connectDB";
import { jwtCheck } from "../../../../../middelware/jwtChecker";
import { user } from "../../../../../model/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'


export async function PUT(req) {

    await connectDB();

    try {
        const data = await req.json()
        const { password, otp } = data

        const encryptPassword2 = await bcrypt.hash(password, 10)

        console.log(encryptPassword2)

        const token = cookies().get("token")
        const jwtMatch = await jwtCheck(token)
        if (!jwtMatch) {
            return NextResponse.json({ success: false, message: "please login or re-login" }, { status: 400 })
        }

        const userData = await user.findOne({ _id: { $eq: jwtMatch._id } }).select("+resetOtp +resetTime +password")

        if(!userData){
            return NextResponse.json({success: false, message : "user not found"}, {status:400})
        }

        if(!userData.resetOtp || !userData.resetTime){
            return NextResponse.json({success: false, message: "OTP not set"}, {status:400})
        }

        const currentTime = new Date()

        if(userData.resetTime < currentTime.getTime()){
            return NextResponse.json({success: false, message: "OTP expaire"}, {status:400})
        }

        if(userData.resetOtp !== otp){
            return NextResponse.json({success: false, message: "Wrong OTP"}, {status:400})
        }

        const encryptPassword = await bcrypt.hash(password, 10)
        
        const newUserData = await user.findOneAndUpdate({_id:{$eq: userData._id}}, {password: encryptPassword, resetOtp: null, resetTime: null}, {new: true})

        return NextResponse.json({ success: true, message: "Password change successfully" })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    }

}