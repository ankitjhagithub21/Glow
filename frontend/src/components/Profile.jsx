import React from 'react'
import { useSelector } from 'react-redux'
import UserPost from './UserPost'

const Profile = () => {
  const user = useSelector(state => state.auth.user)
  return (
    <div className='flex flex-col'>
      <div className='h-44 w-full bg-gray-100 border-b flex items-center justify-center'>
        <div className='flex mt-32 w-full items-center justify-around'>
          <h2>{user.following.length} following</h2>

          <img src={user.profileImg} alt={user.fullName} className='md:w-28 w-20 rounded-full object-contain ' />


          <h2>{user.followers.length} followers</h2>

        </div>

      </div>
      <div className='flex flex-col text-center items-center mt-10'>
        <h2 className='text-2xl font-bold'>{user.fullName}</h2>
        <p className='lg:w-1/2 w-full text-sm'>{user.bio}</p>
      </div>
      <UserPost/>
    </div>
  )
}

export default Profile
