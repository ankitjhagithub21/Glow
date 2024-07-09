import React from 'react'
import { CiSearch } from "react-icons/ci"
const Search = ({query,setQuery}) => {
  return (

    <div className='flex items-center bg-gray-100 rounded-full px-4 py-2 mb-2 '>
      <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='Search here' className='bg-transparent w-full' />
      <CiSearch size={20} />
    </div>

  )
}

export default Search
