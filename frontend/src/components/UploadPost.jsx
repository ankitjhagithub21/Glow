import React, { useState } from 'react'
import toast from "react-hot-toast"
const UploadPost = () => {
  const [loading,setLoading] = useState(false)
  const [title,setTitle] = useState('')
  const [image,setImage] = useState(null)
  const uploadPost = async(e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('title',title)
    formData.append('image',image)
  
    try{
      setLoading(true)

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post/upload`,{
        method:"POST",
        credentials:'include',
        body:formData
      })

      const data = await res.json()
      if(data.success){
        toast.success(data.message)
        setTitle('')
        setImage(null)
      }else{
        toast.error(data.message)
      }

    }catch(error){
      console.log(error)
      toast.error("Post not uploaded.")
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className='h-full flex items-center justify-center px-5'>
      <form onSubmit={uploadPost} className='flex flex-col w-full gap-5'>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className='border p-2 rounded-lg' required/>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} required/>
        <button type='submit' className='bg-green-500 text-white rounded-lg p-2'>
          {
            loading ? 'Uploading...' :'Upload'
          }
        </button>
      </form>
    </div>
  )
}

export default UploadPost
