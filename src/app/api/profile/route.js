import { cookies } from "next/headers";
import connectDB from "../../../../connectDB";
import { jwtCheck } from "../../../../middelware/jwtChecker";
import { NextResponse } from "next/server";
import { user } from "../../../../model/user";


export async function GET(){

    connectDB()

    try {
        
        const token = cookies().get("token")
        const jwtMatch = await jwtCheck(token)
        if(!jwtMatch){
            return NextResponse.json({success: false, message: "please login or re-login"}, {status: 400})
        }

        const userData = await user.findOne({_id: {$eq: jwtMatch._id}})
        
        if(!userData){
            return NextResponse.json({success: false, message: "user not found"}, {status : 404})
        }

        return NextResponse.json({success: true, userData: userData})

    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: "Internal server error"})
    }


}