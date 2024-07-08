import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import { useDispatch } from 'react-redux'
import { setCurrPost, setIsOpen } from '../redux/slices/postSlice'


const Profile = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
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
      <div className='h-44 w-full bg-gray-100 border-b flex items-center justify-center'>
        <div className='flex mt-32 w-full items-center justify-around'>
          <h2>{user.following.length} following</h2>

          <img src={user.profileImg} alt={user.fullName} className='md:w-28 w-20 rounded-full object-contain' />


          <h2>{user.followers.length} followers</h2>

        </div>

      </div>
      <div className='flex flex-col text-center items-center mt-10'>
        <h2 className='text-2xl font-bold'>{user.fullName}</h2>
        <p className='lg:w-1/2 w-full text-sm'>{user.bio}</p>
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
