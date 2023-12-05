"use client"
import LoadingUi from '@/components/LoadingUi'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Page({ params }) {

  const router = useRouter()
  const [taskdata, setTaskdata] = useState('')
  const [loading, setLoading] = useState(false)
  const [isupdate, setIsupdate] = useState(false)
  const [change, setChange] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  const getTaskData = async () => {
    setLoading(true)
    const fetchData = await fetch(`http://localhost:3000/api/task/${params.taskId}`, {
      method: "GET",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      }
    })
    const data = await fetchData.json()
    if (data.success) {
      setTaskdata(data.tasks)
      setFormData({
        title: data.tasks.title,
        description: data.tasks.description
      })
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoading(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    if (!formData.title || !formData.description) {
      toast.info("enter task data".toUpperCase())
      return
    }
    setLoading(true)
    const fetchData = await fetch(`http://localhost:3000/api/task/${params.taskId}`, {
      method: "PUT",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description
      })
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success("Task updated".toUpperCase())
      setIsupdate(!isupdate)
      setChange(!change)
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoading(false)
  }


  const deleteHandler = async () => {
    setLoading(true)
    const fetchData = await fetch(`http://localhost:3000/api/task/${params.taskId}`, {
      method: "DELETE",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      }
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success("Task deleted".toUpperCase())
      router.push("/")
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoading(false)
  }

  const completeHandler = async () => {
    setLoading(true)
    const fetchData = await fetch(`http://localhost:3000/api/task/${params.taskId}/complete`, {
      method: "PUT",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      }
    })
    const data = await fetchData.json()
    if (data.success) {
      setChange(!change)
      toast.success("Task Completed".toUpperCase())
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoading(false)
  }

  const scheduledHandler = async () => {
    setLoading(true)
    const fetchData = await fetch(`http://localhost:3000/api/task/${params.taskId}/schedule`, {
      method: "GET",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      }
    })
    const data = await fetchData.json()
    if (data.success) {
      setChange(!change)
      toast.success("Task Suheduled".toUpperCase())
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoading(false)
  }



  useEffect(() => {
    getTaskData()
  }, [change])

  return (
    (!taskdata) ?
      <div>
        <p className='text-gray-500 text-2xl text-center font-bold'>
          FETCH DATA
        </p>
      </div>
      :
      <div>
        {(loading) ? <LoadingUi /> : ""}
        <center>
          <div className='md:flex md:w-1/2 bg-white py-4 px-4 justify-between'>
            {
              (isupdate) ?
                <form onSubmit={onSubmit} className='w-4/5'>
                  <div>
                    <label htmlFor="title" className="text-sm">Title</label>
                    <input id="title" type="text" placeholder="" className="w-full p-3 rounded border border-black border-2 bg-slate-500" value={formData.title} onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value })
                    }} required />
                  </div>
                  <div>
                    <label htmlFor="description" className="text-sm">Description</label>
                    <textarea id="description" rows="3" className="w-full p-3 rounded border border-black border-2 bg-slate-500" value={formData.description} onChange={(e) => {
                      setFormData({ ...formData, description: e.target.value })
                    }} required></textarea>
                  </div>
                  <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Upadate task
                  </button>
                </form>
                :
                <div className='w-4/5'>
                  <p className='text-left'>
                    ID: {taskdata._id}
                  </p>
                  <p className='text-2xl font-bold text-left'>
                    Title: {taskdata.title}
                  </p>
                  <p className='font-bold text-left'>
                    Description: {taskdata.description}
                  </p>
                  <p className='font-bold text-left'>
                    Time & Date: {taskdata.reminderDate}
                  </p>
                  <p className='font-bold text-left'>Is complete: {(taskdata.isCompleted) ? <span className='text-green-500'>TRUE</span> : <span className='text-red-500'>FALSE</span>}</p>
                  <p className='font-bold text-left'>Task Schedule: {(taskdata.jobSchedule) ? <span className='text-green-500'>TRUE</span> : <span className='text-red-500'>FALSE</span>}</p>
                </div>}
            <div className='pe-8 flex md:flex-col md:flex my-4'>
              <div className="md:px-0">
                <button onClick={() => {
                  setIsupdate(!isupdate)
                }}>
                  {
                    (isupdate) ?
                      <svg className="h-8 w-8 text-purple-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                      :
                      <svg className="h-8 w-8 text-purple-500" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M12 20h9" /> <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                  }
                </button>
              </div>
              <div>
                <button onClick={deleteHandler} disabled={isupdate}>
                  <svg className="h-8 w-8 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button onClick={completeHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200" disabled={(taskdata.isCompleted || isupdate)}>
              Is complete
            </button>
            <button onClick={scheduledHandler} className="ms-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-200" disabled={(taskdata.jobSchedule || isupdate)}>
              Scheduled task
            </button>
          </div>
        </center>
      </div>
  )
}

export default Page
