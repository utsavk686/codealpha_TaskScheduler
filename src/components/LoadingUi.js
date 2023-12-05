import Image from 'next/image'
import React from 'react'

export default function LoadingUi() {
    return (
        <div className="fixed top-0 left-0 right-0 z-40 flex justify-center items-center h-screen w-screen bg-amber-500/50" >
            <div className="absolute animate-spin rounded-full border-t-4 border-b-4 border-purple-500 w-56 h-56"></div>
            <Image src={"https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"} priority className="rounded-full" width={200} height={200} alt={"Loading......"} />
        </div>
    )
}
