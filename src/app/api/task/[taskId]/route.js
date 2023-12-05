import { NextResponse } from "next/server";
import connectDB from "../../../../../connectDB";
import { cookies } from "next/headers";
import { user } from "../../../../../model/user";
import { task } from "../../../../../model/task";
import { jwtCheck } from "../../../../../middelware/jwtChecker";


export async function GET(req, { params }) {

    await connectDB()

    try {
        const taskId = params.taskId
        const token = cookies().get("token")
        const jwtMatch = await jwtCheck(token)
        if (!jwtMatch) {
            return NextResponse.json({ success: false, message: "please login or re-login" }, { status: 400 })
        }
        const userData = await user.findOne({ _id: { $eq: jwtMatch._id } })
        if (!userData) {
            return NextResponse.json({ success: false, message: "user not found please re-login" }, { status: 400 })
        }
        const taskData = await task.findOne({ _id: { $eq: taskId } })

        if (!taskData) {
            return NextResponse.json({ success: false, message: "task not found" }, { status: 404 })
        }

        if (taskData.auther.toString() !== userData._id.toString()) {
            return NextResponse.json({ success: false, message: "you can not authorize" }, { status: 401 })
        }

        return NextResponse.json({ success: true, tasks: taskData })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    }

}



export async function PUT(req, { params }) {

    await connectDB()

    try {
        const data = await req.json()
        const { title, description, reminderDate } = data
        const taskId = params.taskId
        const token = cookies().get("token")
        const jwtMatch = await jwtCheck(token)
        if (!jwtMatch) {
            return NextResponse.json({ success: false, message: "please login or re-login" }, { status: 400 })
        }
        const userData = await user.findOne({ _id: { $eq: jwtMatch._id } })
        if (!userData) {
            return NextResponse.json({ success: false, message: "user not found please re-login" }, { status: 400 })
        }
        const taskData = await task.findOne({ _id: { $eq: taskId } })

        if (!taskData) {
            return NextResponse.json({ success: false, message: "task not found" }, { status: 404 })
        }

        if (taskData.auther.toString() !== userData._id.toString()) {
            return NextResponse.json({ success: false, message: "you can not authorize" }, { status: 401 })
        }

        const newTaskData = await task.findOneAndUpdate({ _id: { $eq: taskId } }, { title: title, description: description, reminderDate: reminderDate })

        const updatedData = await task.findOne({ _id: { $eq: taskId } })

        return NextResponse.json({ success: true, message: "task data updated", task: updatedData })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    }

}

export async function DELETE(req, { params }) {

    await connectDB()

    try {
        const taskId = params.taskId
        const token = cookies().get("token")
        const jwtMatch = await jwtCheck(token)
        if (!jwtMatch) {
            return NextResponse.json({ success: false, message: "please login or re-login" }, { status: 400 })
        }
        const userData = await user.findOne({ _id: { $eq: jwtMatch._id } })
        if (!userData) {
            return NextResponse.json({ success: false, message: "user not found please re-login" }, { status: 400 })
        }
        const taskData = await task.findOne({ _id: { $eq: taskId } })

        if (!taskData) {
            return NextResponse.json({ success: false, message: "task not found" }, { status: 404 })
        }

        if (taskData.auther.toString() !== userData._id.toString()) {
            return NextResponse.json({ success: false, message: "you can not authorize" }, { status: 401 })
        }

        const deleteData = await task.findOneAndDelete({ _id: { $eq: taskId } })

        await userData.task.forEach(async(element, index) => {
            if (element.taskId.toString() === taskId) {
                await userData.task.splice(index, 1)
                await userData.save();
                return;
            }
        });

        return NextResponse.json({ success: true, message: "task deleted", data: deleteData })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    }

}