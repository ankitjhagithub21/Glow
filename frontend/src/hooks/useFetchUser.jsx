import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrUser } from '../redux/slices/userSlice'

const useFetchUser = () => {
    const [loading,setLoading] = useState(true)
    const dispatch = useDispatch()
   useEffect(()=>{
    const fetchUser = async() =>{
       try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`,{
            credentials:'include'
        })
        const data = await res.json()
        if(data.success){
          
            dispatch(setCurrUser(data.user))
        }else{
           
            dispatch(setCurrUser(null))
        }
       }catch(error){
            dispatch(setUser(null))
       }finally{
        setLoading(false)
       }
    }
    fetchUser()
   },[])
   return loading
}

export default useFetchUser
