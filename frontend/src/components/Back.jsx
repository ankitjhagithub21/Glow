import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
const Back = () => {
  return (
    <div className='w-full bg-gray-200 p-2'>
     
    <Link  to={"/"} className='flex items-center gap-1 hover:bg-gray-300 w-fit px-4 py-1 rounded-lg'> <IoIosArrowRoundBack/>Back</Link>
    </div>
    
  )
}

export default Back
