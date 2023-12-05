"use client"
import TaskCard from '@/components/TaskCard'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import LoadingUi from '@/components/LoadingUi'

export default function Home() {

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [change, setChange] = useState(true)

  const getTaskHandler = async () => {
    setLoading(true)
    const fetchData = await fetch("http://localhost:3000/api/task", {
      method: "GET",
      headers: {
        "content-type": "appliction/json; charset=UTF-8",
      },
      next: {
        revalidate: 1
      }
    })
    const data = await fetchData.json()
    if (data.success) {
      setTasks(data.tasks)
    } else {
      toast.error(data.message.toUpperCase())
    }
    setLoading(false)
  }

  useEffect(() => {
    getTaskHandler()
  }, [change])

  return (
    <div className="relative flex flex-col px-4 pt-10 pb-12 font-sans text-gray-700 sm:px-6 lg:px-8">
      <div className="flex-1 space-y-8">
        {
          (loading) ?
            <LoadingUi /> :
            (tasks.length === 0) ?
              <center className='m-20'>
                <p className='text-6xl font-bold tracking-widest'>
                  Not task
                </p>
                <p className='mt-5 text-blue-500 underline'><Link href={"/addTask"}>Add Task</Link></p>
              </center>
              :

              tasks.map((element, index) => {
                return <TaskCard change={change} setChange={setChange} index={index + 1} key={index} data={element} />
              })
        }

      </div>
    </div>
  )
}
