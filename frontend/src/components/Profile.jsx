import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPost, setIsOpen } from '../redux/slices/postSlice'
import formateDate from '../helpers/formateDate'
import { Link } from "react-router-dom"


const Profile = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const { currUser } = useSelector(state => state.user)
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
    <div className='flex flex-col p-5 items-center  gap-1'>

      <img src={user.profileImg} alt="user profile image" className='w-24 border rounded-full object-contain mx-auto' />
      <h2 className='text-2xl font-bold'>{user.fullName}</h2>
      <p>{user.bio}</p>


      <div className='flex items-center justify-center gap-3'>

        <span>{user.posts.length} posts</span>
        <span>{user.following.length} following</span>
        <span>{user.followers.length} followers</span>

      </div>

      <p>Joined {formateDate(user.joined)}</p>
       {
          currUser._id === user._id && <Link to={"/profile/update"} className='bg-green-500 rounded-full text-sm px-2 mt-1 py-1 text-white'>Update Profile</Link>
        }
        <hr className='w-full mt-3' />

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
