import React from 'react'
import Post from './Post'

const AllPost = () => {
  return (
    <div className='flex flex-col overflow-y-scroll h-full pb-10'>
      <div className='flex items-center justify-center p-3 border-b bg-gray-100'>
      <h2 className='text-center text-xl'>Recent Post</h2>
      </div>
     <Post/>
     <Post/>
     <Post/>
     <Post/>
     <Post/>
     <Post/>
     <Post/>
    </div>
  )
}

export default AllPost
