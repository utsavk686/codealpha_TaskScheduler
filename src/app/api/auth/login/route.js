import { NextResponse } from "next/server";
import connectDB from "../../../../../connectDB";
import { user } from "../../../../../model/user"
import { cookies } from 'next/headers'

export async function POST(req) {

    await connectDB()

    try {

        const { email, password } = await req.json()

        console.log(email, password)

        const userData = await user.findOne({ email: { $eq: email } }).select("+password")

        if (!userData) {
            return NextResponse.json({ success: false, message: "this email not be register" }, { status: 400 })
        }

        if (await userData.macthPassword(password)) {
            const data = userData
            data.password = "******"
            const token = await userData.genrateToken()
            cookies().set({
                name: "token",
                value: token,
                httpOnly: true,
                secure: true
            })
            return NextResponse.json({ success: true, data: userData, token: token })
        }
        return NextResponse.json({ success: false, message: "wrong password" })

    } catch (error) {
        console.log(`error: ${error}`)
        return NextResponse.json({ success: false, message: "internal server error" })
    }

} 