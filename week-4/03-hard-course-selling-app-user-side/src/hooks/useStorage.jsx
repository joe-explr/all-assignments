import React, { useEffect,useState } from 'react'

function useStorage(key,value='0') {
    
const [data, setData]= useState(localStorage.getItem(key)|| value)

useEffect(()=>{
    if(data=='0'){
        localStorage.removeItem(key)
    }else{
    localStorage.setItem(key,data)
    }
},[data,key])

return [data, setData]
}

export default useStorage
