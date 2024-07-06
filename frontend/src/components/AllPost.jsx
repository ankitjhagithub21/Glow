import React, { useState, useEffect } from 'react'
import Post from './Post'
import toast from "react-hot-toast"
import Swal from 'sweetalert2'

const AllPost = () => {
  const [posts, setPosts] = useState([])
  const url = `${import.meta.env.VITE_SERVER_URL}/api`
  const [comments,setComments] = useState([])
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
        const res = await fetch(`${url}/post/delete/${postId}`, {
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
  const handleAddComment = async(postId,content) =>{
    try{
      const res = await fetch(`${url}/comment/add`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify({postId,content})
      })
      const data = await res.json()

      if(data.success){
        toast.success(data.message)
       setComments(prev=>[data.comment,...prev])
        
      }
    }catch(error){
      toast.error("Something went wrong.")
    }
  }
  const handleDeleteComment = async(postId,commentId) =>{
    try{
      const res = await fetch(`${url}/comment/${commentId}/post/${postId}`,{
        method:"DELETE",
        credentials:'include',
        
      })
      const data = await res.json()

      if(data.success){
        toast.success(data.message)
        const updatedComments = comments.filter((comment)=>comment._id != commentId)
       setComments(updatedComments)
        
      }else{
        toast.error(data.message)
      }
    }catch(error){
      toast.error("Something went wrong.")
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
          return <Post key={post._id} post={post} handleDelete={handleDelete} handleLikeUnlike={handleLikeUnlike} handleAddComment={handleAddComment} setComments={setComments} comments={comments} handleDeleteComment={handleDeleteComment} />
        })
      }
    </div>
  )
}

export default AllPost
