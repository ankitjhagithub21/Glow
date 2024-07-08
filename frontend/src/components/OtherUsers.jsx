import React, { useState, useEffect } from 'react'
import OtherUser from './OtherUser'
import { useDispatch, useSelector } from 'react-redux'
import { setOtherUsers } from '../redux/slices/userSlice'
import Search from './Search'

const OtherUsers = () => {
   const dispatch = useDispatch()
   const otherUsers = useSelector(state=>state.user.otherUsers)
    const fetchOtherUsers = async() => {
      try{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/others`,{
            credentials:'include',
        })
        const data = await res.json()
        if(data.success){
           
          dispatch(setOtherUsers(data.otherUsers))
         
        }
      }catch(error){
        console.log(error)
      }
    }

    useEffect(()=>{
        fetchOtherUsers()
    },[])
  return (
    <div className='flex flex-col'>
      <Search/>
      {
        otherUsers.map((user)=>{
            return <OtherUser key={user._id} user={user} />
        })
      }
    </div>
  )
}

export default OtherUsers
