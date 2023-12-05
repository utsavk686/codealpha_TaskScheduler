import connectDB from "../../../../../connectDB";
import { NextResponse } from "next/server";
import { user } from "../../../../../model/user"

export async function POST(req) {

    await connectDB()

    try {

        const { name, email, password } = await req.json()

        console.log(name, email, password)

        if (!name || !email || !password) {

            return NextResponse.json({ success: false, message: "fill all field" }, { status: 400 })

        }

        if (await user.findOne({ email: { $eq: email } })) {

            return NextResponse.json({ success: false, message: "Email aleary register" }, { status: 400 })

        }

        const userData = await user.create({
            name: name, email: email, password: password
        })

        console.log(userData)

        userData.password = "*****"

        return NextResponse.json({ success: true, data: userData })

    } catch (error) {
        console.log(`error: ${error}`)
        return NextResponse.json({ success: false, message: "internal server error" })
    }
} 