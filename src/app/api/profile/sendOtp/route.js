import { cookies } from "next/headers";
import connectDB from "../../../../../connectDB";
import { jwtCheck } from "../../../../../middelware/jwtChecker";
import { user } from "../../../../../model/user";
import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "../../../../../middelware/sendMail";


export async function GET(req){

    await connectDB();

    try {

        const token = cookies().get("token")
        const jwtMatch = await jwtCheck(token)
        if (!jwtMatch) {
            return NextResponse.json({ success: false, message: "please login or re-login" }, { status: 400 })
        }

        const userData = await user.findOne({_id: {$eq: jwtMatch._id}}).select("+resetOtp +resetTime")

        if(!userData){
            return NextResponse.json({success: false, message: "user not found"})
        }

        const otp = Math.floor(Math.random() * (999999 - 111111) + 111111)
        const currentTime = Date.now() + 900000

        const isOtpSend = await sendMail(userData.email, "Reset OTP", `Your change password OTP is ${otp}`)

        if(!isOtpSend){
            return NextResponse.json({success: false, message: "OTP not send for internal error"}, {status: 500})
        }

        userData.resetOtp = otp
        userData.resetTime = currentTime
        await userData.save()
        // const setOtpData = await user.findOneAndUpdate({_id:{$eq: userData._id}}, {resetOtp: otp, resetTime: currentTime})

        return NextResponse.json({success: true, message: "OTP send successfully"})

    } catch (error) {
        
    }

}