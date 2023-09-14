import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  let navigate=useNavigate()
    const getBack=()=>{
        navigate('/')
    }
  return (
    <>
    <div>[404] Resource NotFound</div>
    <button onClick={getBack}>Go Home!</button>
    </>
  )
}

export default NotFound