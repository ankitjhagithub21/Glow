import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const UpdateProfile = () => {
  const {currUser} = useSelector(state=>state.user)
  const [loading,setLoading] = useState(false)
  const [updatedUser,setUpdatedUser] = useState({
    fullName:currUser.fullName,
    username:currUser.username,
    bio:currUser.bio,
    profileImg:currUser.profileImg,
    coverImg:currUser.coverImg
  })

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]:value
    })
  }
  const handleSubmit = async(e) =>{
    e.preventDefault()
    try{
      setLoading(true)
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/profile/update`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:'include',
          body:JSON.stringify(updatedUser)
        })
        const data = await res.json()

        if(data.success){
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
    }catch(error){
      toast.error("Something went wrong.")
      console.log(error)
      
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className='p-5 flex flex-col'>
      <h2 className='text-center text-2xl font-bold mb-5'>Update Your Profile</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input type="text" value={updatedUser.fullName} name='fullName' onChange={handleChange} className='border px-4 py-2 rounded-lg' placeholder='Enter full name' required />
        <input type="text" value={updatedUser.username} name='username' onChange={handleChange} className='border px-4 py-2 rounded-lg' placeholder='Enter username' required />
        <input type="text" value={updatedUser.bio} name='bio' onChange={handleChange} className='border px-4 py-2 rounded-lg' placeholder='Enter bio' required />
        <input type="text" value={updatedUser.profileImg} name='profileImg' onChange={handleChange} className='border px-4 py-2 rounded-lg' placeholder='Enter profile Image' required />
        <input type="text" value={updatedUser.coverImg} name='coverImg' onChange={handleChange} className='border px-4 py-2 rounded-lg' placeholder='Enter cover img' required />
        <button disabled={loading} className='bg-green-500 text-white px-4 py-2 rounded-lg' type='submit'>
          {
            loading ? 'updating...' :'Update'
          }
        </button>
      </form>
      
    </div>
  )
}

export default UpdateProfile
