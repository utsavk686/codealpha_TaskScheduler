"use client"
import React, { useCallback, useEffect, useState } from 'react'

function Date_TimeBox() {


  const [time, setTime] = useState(``)
  const [date, setDate] = useState(``)
  var interVal;
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


  const handelDateTime = useCallback(() =>{
    // eslint-disable-next-line react-hooks/exhaustive-deps
    interVal = setInterval(()=>{
      let temp = new Date()
      let tempDate = `${temp.getDate()}/${temp.getMonth()}/${temp.getFullYear()} , ${days[temp.getDay()]}`
      let tempTime = temp.toLocaleString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: "2-digit"
      })
      setDate(tempDate)
      setTime(tempTime)
    }, 1000)
  }, [interVal])

  useEffect(()=>{
    handelDateTime()
    return clearInterval(interVal)
  },[handelDateTime, interVal])

  return (
    <div>
      <center>
        <div className='h-15 w-60 rounded rounded-b-xl border border-2 border-t-0 border-black bg-amber-900 pt-2'>
          <div className='text-2xl text-white tracking-widest'>
            {time}
          </div>
          <div className='text-white'>
            <strong>{date}</strong>
          </div>
        </div>
      </center>
    </div>
  )
}

export default Date_TimeBox
