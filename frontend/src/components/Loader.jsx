import React from 'react'

const Loader = () => {
  return (
    <div className='bg-white h-screen w-full flex gap-10 items-center justify-center'>
      <span className="loader"></span>
      <h2 className='text-gray-800 text-2xl'>Wait a minute...</h2>
    </div>
  )
}

export default Loader
