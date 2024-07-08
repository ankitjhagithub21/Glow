import React from 'react'
import {CiSearch} from "react-icons/ci"
const Search = () => {
  return (
    <div>
        <div className='flex items-center bg-gray-100 rounded-full px-4 py-2 '>
            <input type="text" placeholder='Search here' className='bg-transparent w-full' />
             <CiSearch size={20}/>
        </div>
    </div>
  )
}

export default Search
