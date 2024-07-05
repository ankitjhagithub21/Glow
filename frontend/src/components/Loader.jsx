import React from 'react'

const Loader = () => {
  return (
    <div className='bg-[#4A69BD] h-screen w-full flex gap-10 items-center justify-center'>
      <span className="loader"></span>
      <h2 className='text-white text-2xl'>Loading...</h2>
    </div>
  )
}

export default Loader
