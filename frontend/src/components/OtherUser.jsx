import React from 'react'
import { useNavigate } from 'react-router-dom'

const OtherUser = ({user}) => {
    const navigate = useNavigate()
  return (
    <div className='flex justify-between items-center p-2 rounded-full'>
        <div className='flex items-center gap-1 cursor-pointer' onClick={()=>navigate(`/profile/${user._id}`)}>
        <img src={user.profileImg} alt={user.fullName} className='w-10 rounded-full' />
        <div className='flex flex-col'>
            <span className='text-sm font-semibold hover:underline'>{user.fullName}</span>
            <span className='text-xs hover:underline'>@{user.username}</span>
        </div>
        </div>
        <button className='bg-gray-800 text-white p-2 text-xs rounded-full'>Follow</button>
    </div>
  )
}

export default OtherUser
