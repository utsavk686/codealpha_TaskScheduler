"use client"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'



function Page() {

  const [userdata, setUserdata] = useState('')
  const [loading, setLoading] = useState(true)
  const [change, setChange] = useState(false)

  const getProfileData = async () => {
    setLoading(true)
    const fetchdata = await fetch("http://localhost:3000/api/profile", {
      method: "GET",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      },
      next: {
        revalidate: 1
      }
    })
    const data = await fetchdata.json()
    if (!data.success) {
      toast.error(data.message.toUpperCase())
    } else {
      setUserdata(data.userData)
    }
    setLoading(false)
  }

  const changeNameHandler = async() =>{
    const newname = await prompt("Enter name: ")
    if(newname===userdata.name || newname===""){
      toast.info("ENTER DIFFERENT NAME")
      return
    }
    setLoading(true)
    const fetchdata = await fetch("http://localhost:3000/api/profile/changeName", {
      method: "PUT",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: newname
      }),
    })
    const data = await fetchdata.json()
    if(data.success){
      toast.success("Name Changed successfully".toUpperCase())
    }else{
      toast.error(data.message.toUpperCase())
    }
    setChange(!change)
    setLoading(false)
  }

  const changePasswordHandlerWithOtp = async(otp, password, n=false)=>{
    const fetchData = await fetch("http://localhost:3000/api/profile/changePassword", {
      method: "PUT",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      },
      body: JSON.stringify({
        otp: Number.parseInt(otp),
        password: password
      })
    })
    const data = await fetchData.json()
    if(data.success){
      toast.success("Password changed".toUpperCase())
    }else{
      if(data.message === "Wrong OTP" && !n){
        const reOtp = prompt("Wrong Otp enter please enter valid otp")
        await changePasswordHandlerWithOtp(reOtp, password, true)
      }else{
        toast.error(data.message.toUpperCase())
      }
    }
  }


  const changePasswordHandler = async() =>{
    setLoading(true)
    const fetchSendMailData = await fetch("http://localhost:3000/api/profile/sendOtp", {
      method: "GET",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      }
    })
    const sendMailData = await fetchSendMailData.json()
    if(sendMailData.success){
      alert("Otp send on your email".toUpperCase())
    }else{
      toast.error(sendMailData.message.toUpperCase())
      return;
    }
    const otp = prompt("Enter OTP")
    const newPassword = prompt("Enter new password")
    await changePasswordHandlerWithOtp(otp, newPassword)
    setChange(!change)
    setLoading(false)
  }

  useEffect(() => {
    getProfileData()
  }, [change])

  return (

    <center>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

        <svg className="h-24 w-24 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" />
        </svg>

        {
          (loading) ?
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
              <span className="sr-only">Loading...</span>
            </div>
            :
            <div>
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {userdata.name}
              </h5>
              <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                {userdata.email}
              </p>
            </div>
        }
        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 me-2" onClick={changeNameHandler}>Chenge name</button>
        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={changePasswordHandler}>Chenge password</button>
      </div>
    </center>


  )
}

export default Page
