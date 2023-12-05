import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../../connectDB";

export async function GET(req){

    await connectDB()

    try {

        if(!cookies().get("token")){
            return NextResponse.json({success: false, message: "No account login, first login then invoke logout"}, {status: 400})
        }
        cookies().set({
            name: "token",
            value: "",
            maxAge: 0
        })
        return NextResponse.json({success: true, message: "account is logout"})
        
    } catch (error) {
        
        return NextResponse.json({success: false, message: "internal server error"},{ status: 500})

    }
    
} 