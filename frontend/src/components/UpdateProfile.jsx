import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
  const { currUser } = useSelector(state => state.user)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [fullName, setFullName] = useState(currUser.fullName)
  const [username, setUsername] = useState(currUser.username)
  const [bio, setBio] = useState(currUser.bio)
  const [profileImg, setProfileImg] = useState(currUser.profileImg)
  const [profileImgFile, setProfileImgFile] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImg(reader.result)
      }
      reader.readAsDataURL(file)
      setProfileImgFile(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
   
    const formData = new FormData()

    formData.append('fullName', fullName)
    formData.append('username', username)
    formData.append('bio', bio)
    formData.append('profileImg', profileImgFile)

    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/profile/update`, {
        method: "POST",
        credentials: 'include',
        body: formData
      })
      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        navigate(`/profile/${currUser._id}`)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Something went wrong.")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-5 flex flex-col h-full justify-center'>
      <h2 className='text-center text-2xl font-bold mb-5'>Update Your Profile</h2>
      <form onSubmit={handleSubmit} className='flex flex-col  gap-3'>

        <div className='flex flex-col gap-1'>
          <label htmlFor="profileImg" className='cursor-pointer'>
            <img src={profileImg} alt="Profile Image" className='w-28 mx-auto rounded-full' />
          </label>
          <input type="file" id='profileImg' className='hidden' onChange={handleImageChange} />
        </div>
        <input type="text" value={fullName} name='fullName' onChange={(e) => setFullName(e.target.value)} className='border px-4 py-2 rounded-lg' placeholder='Enter full name' required />
        <input type="text" value={username} name='username' onChange={(e) => setUsername(e.target.value)} className='border px-4 py-2 rounded-lg' placeholder='Enter username' required />
        <input type="text" value={bio} name='bio' onChange={(e) => setBio(e.target.value)} className='border px-4 py-2 rounded-lg' placeholder='Enter bio' required />
        <button disabled={loading} className='bg-green-500 text-white px-4 py-2 rounded-lg' type='submit'>
          {loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  )
}

export default UpdateProfile
