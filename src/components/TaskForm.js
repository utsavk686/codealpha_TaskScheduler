"use client"
/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image'
import React, { useState } from 'react'
import taskLogo from "../../public/assets/addTaskLogo.png"
import { toast } from 'react-toastify'
import LoadingUi from './LoadingUi'

function TaskForm() {

    const [title, setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [reminderDate, setReminderDate] = useState('')
    const [loading, setLoading] = useState(false)


    const changeHandler = (e) =>{
        if(e.target.id === "title"){
            setTitle(e.target.value)
        }else if(e.target.id === "description"){
            setDescription(e.target.value)
        }else if(e.target.id === "reminderDate"){
            setReminderDate(e.target.value)
        }
    }

    const submitHandler = async(e)=>{
        e.preventDefault()
        setLoading(true)
        const enterDate = new Date(reminderDate)
        const currentDate = new Date()
        if(currentDate.getTime() > enterDate.getTime()){
            toast.info("enter time is past please enter future time".toUpperCase())
            setLoading(false)
            return;
        }
        console.log(title, description, reminderDate, enterDate, currentDate)
        const fetchData = await fetch("http://localhost:3000/api/addTask",{
            method: "POST",
            headers: {
                "content-type": "appliction/json; charset=UTF-8",
            },
            body: JSON.stringify({
                title: title,
                description: description,
                reminderDate: reminderDate
            })
        })
        const data = await fetchData.json()
        if(data.success){
            toast.success("Task created".toUpperCase())
            setDescription('')
            setReminderDate("")
            setTitle('')
        }else{
            toast.error(data.message.toUpperCase())
        }
        setLoading(false)
    }

    return (

        <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-slate-600 text-black">
            <div className="flex flex-col justify-between">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold leadi lg:text-5xl">Let's schedule your task!</h2>
                </div>
                <Image src={taskLogo} height={350} width={350} alt="" className="p-1 h-52 md:h-64" priority />
            </div>
            <form onSubmit={submitHandler} className="space-y-6">
                <div>
                    <label htmlFor="title" className="text-sm">Title</label>
                    <input id="title" type="text" placeholder="" className="w-full p-3 rounded border border-black border-2 bg-slate-500" value={title} onChange={changeHandler} required/>
                </div>
                <div>
                    <label htmlFor="description" className="text-sm">Description</label>
                    <textarea id="description" rows="3" className="w-full p-3 rounded border border-black border-2 bg-slate-500" value={description} onChange={changeHandler} required></textarea>
                </div>
                <div>
                    <label htmlFor="reminderDate" className="text-sm">Date and Time</label>
                    <input id="reminderDate" rows="3" type="datetime-local" className="w-full p-3 rounded border border-black border-2 bg-slate-500" value={reminderDate} onChange={changeHandler} required/>
                </div>
                <button type="submit" className="w-full p-3 text-sm font-bold tracki uppercase rounded dark:bg-violet-400 dark:text-gray-900 hover:text-slate-100">ADD TASK</button>
                {
                    (loading)?
                    <LoadingUi/>:""
                }
            </form>
        </div>

    )
}

export default TaskForm
