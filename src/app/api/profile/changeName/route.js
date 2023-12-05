import { cookies } from "next/headers";
import connectDB from "../../../../../connectDB";
import { jwtCheck } from "../../../../../middelware/jwtChecker";
import { user } from "../../../../../model/user";
import { NextResponse } from "next/server";


export async function PUT(req){

    await connectDB();

    try {
        const data = req.json()
        const {name} = await data

        const token = cookies().get("token")
        const jwtMatch = await jwtCheck(token)
        if (!jwtMatch) {
            return NextResponse.json({ success: false, message: "please login or re-login" }, { status: 400 })
        }

        var userData = await user.findOne({_id: {$eq: jwtMatch._id}})

        if(!userData){
            return NextResponse.json({success: false, message: "user not found"})
        }

        userData.name = name
        await  userData.save()
        // const newUserData = await user.findOneAndUpdate({_id: {$eq: userData._id}}, {name: name}, {new: true})

        return NextResponse.json({success: true, message: "Name changed successfully", data : userData})

    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: "Internal server error"})
    }

}