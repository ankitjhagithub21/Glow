import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/authSlice'

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
            dispatch(setUser(data.user))
        }else{
            dispatch(setUser(null))
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
