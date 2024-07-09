import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrPost, setIsOpen } from '../redux/slices/postSlice'
import {IoIosClose} from "react-icons/io"
import { LuDot } from 'react-icons/lu'
import formateDate from '../helpers/formateDate'

const CurrPost = () => {
    const currPost = useSelector(state => state.post.currPost)
    const dispatch = useDispatch()
    
    return (
        <div className='h-screen w-full z-50 flex flex-col items-center justify-center fixed top-0 left-0 p-5 '>
            <div className='lg:w-1/2 w-full bg-white h-full overflow-y-auto relative  flex flex-col gap-3 justify-center rounded-xl p-3 shadow-xl'>
                <button className=' p-1 rounded-full  absolute  top-1 right-1 hover:bg-gray-100' onClick={() => {

                    dispatch(setIsOpen(false))
                    dispatch(setCurrPost(null))
                }}>
                    <IoIosClose size={25}/>
                </button>
               {
                  currPost.user && <div className='flex items-center gap-1 '>
                    <img src={currPost.user.profileImg} alt={currPost.user.fullName} className='w-12 rounded-full' />
                    <div className='flex flex-col'>
                        <div className='flex items-center gap-1'>
                        <span>{currPost.user.fullName}</span>
                        <LuDot/>
                        <span>{formateDate(currPost.createdAt)}</span>
                        </div>
                        <span>@{currPost.user.username}</span>
                    </div>
                </div>
               }
                <h1>{currPost.title}</h1>
                <img src={currPost?.image.url} alt="image" className='max-h-[60vh] object-contain rounded-lg' />
                
            </div>

        </div>
    )
}

export default CurrPost
