import React, { useState, useEffect } from 'react'
import Post from './Post'

const AllPost = () => {
  const [posts,setPosts] = useState([])
  const fetchAllPost = async() =>{
    try{
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post/all`,{
        credentials:'include'
      })
      const data = await res.json()
      if(data.success){
        setPosts(data.posts)
      }
      
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchAllPost()
  },[])
  return (
    <div className='flex flex-col overflow-y-scroll h-full pb-10'>
      <div className='flex items-center justify-center p-3 border-b bg-gray-100'>
      <h2 className='text-center text-xl'>Recent Post</h2>
      </div>
     {
      posts.map((post)=>{
        return <Post key={post._id} post={post}/>
      })
     }
    </div>
  )
}

export default AllPost
