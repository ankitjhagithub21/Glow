import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPost, setIsOpen } from '../redux/slices/postSlice'
import formateDate from '../helpers/formateDate'
import {Link} from "react-router-dom"


const Profile = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const {currUser} = useSelector(state=>state.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/profile/${id}`)
        const data = await res.json()
        if (data.success) {
          setUser(data.user)

        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])


  if (loading) {
    return <Loader />
  }
  if (!user) {
    return <div className='flex items-center justify-center h-full '>
      <h1 className='text-2xl'>User not found.</h1>
    </div>
  }
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col'>
        <div className='w-full h-56 bg-gray-100'>
          <img src={user.coverImg} alt="user cover image" className='w-full h-full object-cover object-center' />
        </div>
       
        <img src={user.profileImg} alt="user profile image" className='w-24 -mt-12 rounded-full object-contain mx-auto' />
      </div>
      <div className='flex flex-col text-center items-center mt-5'>
        <h2 className='text-2xl font-bold'>{user.fullName}</h2>
        <p className='lg:w-1/2 w-full text-sm'>{user.bio}</p>
        <div className='flex items-center justify-center gap-3'>
       
          <span>{user.posts.length} posts</span>
          <span>{user.following.length} following</span>
          <span>{user.followers.length} followers</span>
        
        </div>
        <span>
          Joined {formateDate(user.joined)}</span>
      </div>
      <div className='bg-yellow-200 mt-2 p-2 flex items-center gap-2'>
      {
        currUser._id === user._id &&  <Link to={"/profile/update"} className='bg-green-500 rounded-full text-sm px-2 py-1'>Update Profile</Link>
      }
      

      </div>
   
      <div className='flex flex-wrap w-full mt-3 p-2'>
        {
          user.posts.length > 0 && user.posts.map((post) => {
            return <div key={post._id} className='md:w-1/3 w-1/2 p-2 cursor-pointer' onClick={() => {
              dispatch(setCurrPost(post))
              dispatch(setIsOpen(true))
            }}>
              <img src={post.image.url} alt="photo" className='rounded-lg h-32  w-full object-cover object-center hover:scale-110 z-0' />

            </div>
          })
        }
      </div>
    </div>
  )
}

export default Profile
