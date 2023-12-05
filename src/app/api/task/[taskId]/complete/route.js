import { NextResponse } from "next/server";
import connectDB from "../../../../../../connectDB";
import { cookies } from "next/headers";
import { jwtCheck } from "../../../../../../middelware/jwtChecker";
import { user } from "../../../../../../model/user";
import { task } from "../../../../../../model/task";


export async function PUT(req, {params}){

    await connectDB()

    try {
        
        const {taskId} = params

        const token = cookies().get("token")
        const jwtMatch = await jwtCheck(token)

        if(!jwtMatch){
            return NextResponse.json({success: false, message: "please login or re-login"}, {status: 400})
        }

        const userData = await user.findOne({_id: {$eq: jwtMatch._id}})
        const taskData = await task.findOne({_id: {$eq: taskId}})

        if(!userData || !taskData){
            return NextResponse.json({success: false, message: "not found"}, {status: 400})
        }

        if(taskData.auther.toString() !== userData._id.toString()){
            return NextResponse.json({success: false, message: "you can not authorize"}, {status:401})
        }

        taskData.isCompleted = true

        await taskData.save()

        await userData.task.forEach(async (element, index) => {
            if(element.taskId.toString() === taskData._id.toString()){
                userData.task[index].status = "completed"
                await userData.save()
                return; 
            }
        });
 
        return NextResponse.json({success: true, message: "task completed"})

    } catch (error) {
        
        console.log(error)
        return NextResponse.json({success: false, message: "internal server error"}, {status: 500})

    }


}