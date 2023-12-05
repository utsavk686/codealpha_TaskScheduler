import { NextResponse } from "next/server"
import connectDB from "../../../../connectDB"
import { jwtCheck } from "../../../../middelware/jwtChecker"
import { cookies } from "next/headers"
import { user } from "../../../../model/user"
import { task } from "../../../../model/task"


export async function POST(req) {

    await connectDB()

    try {

        const data = await req.json()

        const { title, description, reminderDate } = data

        console.log(title, description, reminderDate)

        const token = cookies().get("token")
        const jwtMatch = await jwtCheck(token)

        if (!jwtMatch) {
            return NextResponse.json({ success: false, message: "please login or re-login" }, { status: 400 })
        }

        if (!title || !description || !reminderDate) {
            return NextResponse.json({ success: false, message: "fill all fiald" }, { status: 400 })
        }

        const userData = await user.findOne({ _id: { $eq: jwtMatch._id } })

        if (!userData) {
            return NextResponse.json({ success: false, message: "user not find please re-login" }, { status: 400 })
        }

        const taskData = await task.create({ title: title, description: description, auther: userData._id, reminderDate: reminderDate })

        await userData.task.push({ taskId: taskData._id })

        await userData.save()

        return NextResponse.json({ success: true, user: userData, task: taskData })


    } catch (error) {

        return NextResponse.json({ success: false, message: "internel server error" }, { status: 500 })

    }


}