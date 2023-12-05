"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function TaskCard(props) {

  const [loadingComplete, setLoadingComplete] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)

  const completehandler = async () => {
    setLoadingComplete(true)
    const fetchData = await fetch(`http://localhost:3000/api/task/${props.data._id}/complete`, {
      method: "PUT",
      headers: {
        headers: {
          "content-type": "appliction/json; charset=UTF-8",
        }
      }
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success("Task completed".toUpperCase())
      props.setChange(!props.change)
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoadingComplete(false)
  }

  const deleteHandler = async () => {
    setLoadingDelete(true)
    const v = confirm(`Delete task Id: ${props.data.jobID}`)
    if (!v) {
      setLoadingDelete(false)
      toast.info("Task not delete".toUpperCase())
      return;
    }
    const fetchData = await fetch(`http://localhost:3000/api/task/${props.data._id}`, {
      method: "DELETE",
      headers: {
        headers: {
          "content-type": "appliction/json; charset=UTF-8",
        }
      }
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success("Task Deleted".toUpperCase())
      props.setChange(!props.change)
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoadingDelete(false)
  }


  return (

    <div
      style={{ top: `calc(1rem * ${props.index})` }}
      className={`sticky w-full max-w-xl px-8 py-6 mx-auto space-y-4 ${(props.data.isCompleted) ? 'bg-green-400' : 'bg-white'} border rounded-lg shadow-lg flex justify-between hover:border-black hover:border-2`}
    >
      <div>
        <h2 className="space-y-1 text-2xl font-bold leading-none text-gray-900">
          <span className="block text-sm text-blue-700">
            Task #{props.index}, <br /> <Link href={`/task/${props.data._id}`}>ID: {props.data.jobID}</Link>
          </span>
          <span className={`block ${(props.data.isCompleted) ? "line-through" : ""}`}>{props.data.title.substring(0,20) + `${(props.data.title.length > 20)?"....":""}`}</span>

        </h2>
        <p className='break-words'>
          {props.data.description.substring(0,40) + `${(props.data.description.length > 50)?"....":""}`}
        </p>
        <code>
          {props.data.reminderDate}
        </code>
      </div>
      <div className='order-last'>
        <div>
          <button className='me-3' onClick={completehandler} disabled={props.data.isCompleted}>
            {
              (loadingComplete) ?
                <svg className="h-8 w-8 text-indigo-500 animate-spin" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="12" x2="12" y2="12.01" />  <path d="M12 2a4 10 0 0 0 -4 10a4 10 0 0 0 4 10a4 10 0 0 0 4 -10a4 10 0 0 0 -4 -10" transform="rotate(45 12 12)" />  <path d="M12 2a4 10 0 0 0 -4 10a4 10 0 0 0 4 10a4 10 0 0 0 4 -10a4 10 0 0 0 -4 -10" transform="rotate(-45 12 12)" /></svg>
                :
                (props.data.isCompleted) ?
                  <svg className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>
                  :
                  <svg className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="12" cy="12" r="9" />  <polyline points="12 7 12 12 15 15" /></svg>
            }
          </button>

          <button onClick={deleteHandler}>
            {
              (loadingDelete) ?
                <svg className="h-8 w-8 text-indigo-500 animate-spin" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="12" y1="12" x2="12" y2="12.01" />  <path d="M12 2a4 10 0 0 0 -4 10a4 10 0 0 0 4 10a4 10 0 0 0 4 -10a4 10 0 0 0 -4 -10" transform="rotate(45 12 12)" />  <path d="M12 2a4 10 0 0 0 -4 10a4 10 0 0 0 4 10a4 10 0 0 0 4 -10a4 10 0 0 0 -4 -10" transform="rotate(-45 12 12)" /></svg>
                :
                <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
            }
          </button>

        </div>
      </div>
    </div>

  )
}

export default TaskCard
