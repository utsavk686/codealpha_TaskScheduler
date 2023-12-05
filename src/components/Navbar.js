"use client"
import Link from 'next/link'
import React from 'react'
import LogBtn from './LogBtn'
import { usePathname } from 'next/navigation';
import Date_TimeBox from './Date_TimeBox';


function Navbar() {

    const path = usePathname()

    return (

        <div className='fixed top-0 left-0 right-0 z-40'>
            <nav className="flex justify-between px-20 py-4 items-center bg-slate-500">
                <a href="/">
                    <h1 className="text-xl text-amber-500 font-bold">TASK SCHEDULER</h1>
                </a>
                <div className="flex items-center">
                    {
                        (path.startsWith("/auth")) ? "" :
                            <ul className="flex items-center space-x-6">
                                <li className={`font-semibold text-black hover:text-xl ${(path === "/") ? "text-stone-400 underline" : ""}`}>
                                    <Link href={"/"}>
                                        TASK
                                    </Link>
                                </li>
                                <li className={`font-semibold text-black hover:text-xl ${(path === "/addTask") ? "text-stone-400 underline" : ""}`}>
                                    <Link href={"/addTask"}>
                                        ADD TASK
                                    </Link>
                                </li>
                                <li className={`font-semibold text-black hover:text-xl ${(path === "/profile") ? "text-stone-400 underline" : ""}`}>
                                    <Link href={"/profile"}>
                                        PROFILE
                                    </Link>
                                </li>
                                <li className="">
                                    <LogBtn />
                                </li>
                            </ul>
                    }
                </div>
            </nav>
            <Date_TimeBox />
        </div>

    )
}

export default Navbar
