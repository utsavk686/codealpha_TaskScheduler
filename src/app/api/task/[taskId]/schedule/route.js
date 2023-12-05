import { NextResponse } from "next/server";
import connectDB from "../../../../../../connectDB";
import { cookies } from "next/headers";
import { jwtCheck } from "../../../../../../middelware/jwtChecker";
import { user } from "../../../../../../model/user";
import { task } from "../../../../../../model/task";
import schedule from "node-schedule";
import { sendMail } from "../../../../../../middelware/sendMail";

var job;

export async function GET(req, {params}){

    await connectDB()

    try {
        const {taskId} = params

        const token = cookies().get("token")
        const jwtMatch = await jwtCheck(token)
        if(!jwtMatch){
            return NextResponse.json({success: false, message: "please login or re-login"}, {status: 400})
        }

        const userData = await user.findOne({_id: {$eq: jwtMatch._id}})

        if(!userData){
            return NextResponse.json({success: false, message: "user not found"}, {status: 400})
        }

        const taskData = await task.findOne({_id : {$eq: taskId}})

        if(!taskData){
            return NextResponse.json({success: false, message: "task not found"}, {status: 400})
        }

        if(taskData.auther.toString() !== userData._id.toString()){
            return NextResponse.json({success: false, message: "you can not authorize"}, {status:401})
        }

        if(taskData.jobSchedule){
            return NextResponse.json({success: false, message: "task already scheduled"},{status: 400})
        }

        const currentTime = new Date()
        if(currentTime.getTime() > taskData.reminderDate.getTime()){
            return NextResponse.json({success: false, message: "time is over"},{status: 400})
        }

        job = await schedule.scheduleJob(task.dueDate, async function(){
            const sendData = `Hello, ${userData.name}. /n Time for task with title: ${taskData.title} and description: ${taskData.description}`
            await sendMail(userData.email, "Remainder for task schedulet", sendData)
        })

        taskData.jobSchedule = true
        await taskData.save()

        return NextResponse.json({success: true, message: "task scheduled"})

    } catch (error) {
        
        console.log(error)
        return NextResponse.json({success: false, message: "internal server error"}, {status: 500})

    }
}

export async function DELETE(req, {params}){
    await connectDB()

    try {
        const {taskId} = params

        const token = cookies().get("token")
        const jwtMatch = await jwtCheck(token)
        if(!jwtMatch){
            return NextResponse.json({success: false, message: "please login or re-login"}, {status: 400})
        }

        const userData = await user.findOne({_id: {$eq: jwtMatch._id}})

        if(!userData){
            return NextResponse.json({success: false, message: "user not found"}, {status: 400})
        }

        const taskData = await task.findOne({_id : {$eq: taskId}})

        if(!taskData){
            return NextResponse.json({success: false, message: "task not found"}, {status: 400})
        }

        if(!taskData.jobSchedule){
            return NextResponse.json({success: false, message: "task not scheduled"}, {status: 400})
        }

        await job.cancel();
        
        return NextResponse.json({success: true, message: "task scheduled"})

    } catch (error) {
        
        console.log(error)
        return NextResponse.json({success: false, message: "internal server error"}, {status: 500})

    }
}