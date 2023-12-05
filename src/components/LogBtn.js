"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import LoadingUi from './LoadingUi'

function LogBtn() {

    const [loading, setLoading] = useState(false)
    const routes = useRouter()

    const logOutHandler = async () => {
        setLoading(true)
        const fetchData = await fetch("http://localhost:3000/api/auth/logout", {
            method: "GET",
            headers: {
                "content-type": "appliction/json; charset=UTF-8",
            },
        })
        const data = await fetchData.json()
        if (data.success) {
            toast.success("Log out sccessfully".toUpperCase())
            routes.push("/auth/login")
        } else {
            toast.error(data.message.toUpperCase())
        }
        setLoading(false)
    }

    return (
        <>
        {
            (loading)?<LoadingUi/>:""
        }
            <button
                className="flex select-none items-center gap-2 rounded-lg py-1 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-amber-950 transition-all hover:bg-neutral-700 hover:text-stone-200 active:bg-amber-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                data-ripple-dark="true"
                onClick={logOutHandler}
            >
                Log out
            </button>
        </>
    )
}

export default LogBtn
