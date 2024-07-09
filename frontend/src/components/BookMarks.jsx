import React from 'react'
import Back from './Back'
import { useSelector } from 'react-redux'
import useFetchUser from "../hooks/useFetchUser"
import Loader from './Loader'

const BookMarks = () => {
  const loading = useFetchUser()
  const {currUser} = useSelector(state=>state.user)
  if(loading){
    return <Loader/>
  }
 
  return (
    <div>
      <Back/>

      {
        currUser.bookmarks.length  == 0 ? <p className='text-center mt-5'>You have not saved any post.</p> : <div className='flex flex-wrap w-full'>
         {
          currUser.bookmarks.map((post)=>{
            return <div key={post._id} className='lg:w-1/3 md:w-1/2 w-full p-2'>
              <img src={post.image.url} alt="thumbnail" className='w-full' />
            </div>
          })
         }
        </div>
      }

    </div>
  )
}

export default BookMarks
