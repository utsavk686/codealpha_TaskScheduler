import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export const jwtCheck = (token) =>{
    try {

        console.log(token)

        return jwt.verify(token.value, process.env.JWT_SECRET);

    } catch (error) {
        return false
    }
} 