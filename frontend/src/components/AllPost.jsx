import React, { useState, useEffect } from 'react'
import Post from './Post'
import toast from "react-hot-toast"
import Swal from 'sweetalert2'
import Loader from './Loader'

const AllPost = () => {
  const [posts, setPosts] = useState([])
  const url = `${import.meta.env.VITE_SERVER_URL}/api`
  
  
  const [loading,setLoading] = useState(false)
  const fetchAllPost = async () => {
    try {
      const res = await fetch(`${url}/post/all`, {
        credentials: 'include'
      })
      const data = await res.json()
      if (data.success) {
        setPosts(data.posts)
      }

    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (postId) => {
    try {

      const result  = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })

      if(result.isConfirmed){
        setLoading(true)
        const res = await fetch(`${url}/post/delete/${postId}`, {
          method: "DELETE",
          credentials: 'include'
        })
        const data = await res.json()
        if (data.success) {
          setLoading(false)
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted.",
            icon: "success"
          });
          fetchAllPost()

        }
      }

      
    } catch (error) {
      console.log(error)
    }
  }
  const handleLikeUnlike = async(postId) =>{
      try{
        const res = await fetch(`${url}/post/like/${postId}`,{
          method:"POST",
          credentials:'include'
        })
        const data = await res.json()
        if(data.success){
          toast.success(data.message)
          fetchAllPost()
        }else{
          toast.error(data.message)
        }
      }catch(error){
        toast.error("Network error.")
      }
  }
 
  useEffect(() => {
    fetchAllPost()
  }, [])
  if(loading){
    return <Loader/>
  }
  return (
    <div className='flex flex-col overflow-y-scroll h-full pb-10'>
      <div className='flex items-center justify-center p-3 border-b bg-gray-100'>
        <h2 className='text-center text-xl'>Recent Post</h2>
      </div>
      {
        posts.map((post) => {
          return <Post key={post._id} post={post} handleDelete={handleDelete} handleLikeUnlike={handleLikeUnlike} />
        })
      }
    </div>
  )
}

export default AllPost