import React, { useState, useEffect } from 'react'
import Post from './Post'

import Swal from 'sweetalert2'

const AllPost = () => {
  const [posts, setPosts] = useState([])
  const url = `${import.meta.env.VITE_SERVER_URL}/api/post`
  const fetchAllPost = async () => {
    try {
      const res = await fetch(`${url}/all`, {
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
        const res = await fetch(`${url}/delete/${postId}`, {
          method: "DELETE",
          credentials: 'include'
        })
        const data = await res.json()
        if (data.success) {
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
  useEffect(() => {
    fetchAllPost()
  }, [])
  return (
    <div className='flex flex-col overflow-y-scroll h-full pb-10'>
      <div className='flex items-center justify-center p-3 border-b bg-gray-100'>
        <h2 className='text-center text-xl'>Recent Post</h2>
      </div>
      {
        posts.map((post) => {
          return <Post key={post._id} post={post} handleDelete={handleDelete} />
        })
      }
    </div>
  )
}

export default AllPost
