import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export function middleware(request) {
    const path = request.nextUrl.pathname
    console.log("middleware run", path)
    if(path.startsWith('/api')){
        console.log('server')
    }else{
        console.log('browser')
        const token = cookies().get("token")
        console.log(token)
        if(path.startsWith("/auth")){
            if(token){
                return NextResponse.redirect(new URL('/', request.url))
            }else{
                console.log("login and singup page")
            }
        }else if(path==="/" || path==="/addToken" || path==="/profile" || path.startsWith("/task")){
            if(!token){
                return NextResponse.redirect(new URL('/auth/login', request.url))
            }else{
                console.log("account page")
            }
        }
    }
    return
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/:path*',
}