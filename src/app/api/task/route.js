import { NextResponse } from "next/server";
import connectDB from "../../../../connectDB";
import { cookies } from "next/headers";
import { user } from "../../../../model/user";
import { task } from "../../../../model/task";
import { jwtCheck } from "../../../../middelware/jwtChecker";


export async function GET(){

    await connectDB()

    try {
        
        const token = cookies().get("token")
        const jwtMatch = await jwtCheck(token)
        if (!jwtMatch) {
            return NextResponse.json({ success: false, message: "please login or re-login" }, { status: 400 })
        }
        const userData = await user.findOne({_id: {$eq: jwtMatch._id}})
        if(!userData){
            return NextResponse.json({ success: false, message: "user not found please re-login" }, { status: 400 })
        }
        const tasksData = await task.find({auther: {$eq: userData._id}})

        return NextResponse.json({success: true, tasks: tasksData})

    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: "Internal server error"}, {status:500})
    }

}