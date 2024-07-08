import React, { useState, useEffect } from 'react'
import OtherUser from './OtherUser'

const OtherUsers = () => {
    const [otherUsers,setOtherUsers] = useState([])
    useEffect(()=>{
        const fetchOtherUsers = async() => {
          try{
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/others`,{
                credentials:'include',
            })
            const data = await res.json()
            if(data.success){
                setOtherUsers(data.otherUsers)
                console.log(data.otherUsers)
            }
          }catch(error){
            console.log(error)
          }
        }
        fetchOtherUsers()
    },[])
  return (
    <div className='flex flex-col mt-5'>
      {
        otherUsers.map((user)=>{
            return <OtherUser key={user._id} user={user}/>
        })
      }
    </div>
  )
}

export default OtherUsers
