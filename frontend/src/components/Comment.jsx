import React from 'react'
import {LuDot} from "react-icons/lu"
import { useSelector } from 'react-redux'
import formateDate from '../helpers/formateDate'
const Comment = ({comment,handleDeleteComment,postId}) => {
    const currUser = useSelector(state=>state.auth.user)
    
    return (
        <div className='p-2 flex items-start gap-2 my-1'>

            <img src={comment.user?.profileImg} alt="profile" className='w-8 rounded-full' />

            <div className='flex flex-col items-start gap-1 w-full'>
                <div className='flex items-center'>
                <span className='text-sm font-semibold' >@{comment.user?.username}</span>
                <span>
                    <LuDot/>
                </span>
                <span className='text-xs'>{comment?.createdAt && formateDate(comment.createdAt)}</span>
                </div>
                <p className='bg-gray-200 p-2 rounded-lg text-sm w-full'>{comment?.content}</p>
                {
                  comment?._id &&  currUser._id ===  comment.user._id && <button onClick={()=>handleDeleteComment(postId,comment._id)} className='text-xs px-2 py-1 bg-red-500 text-white rounded-lg'>Delete</button>
                }
            </div>

        </div>
    )
}

export default Comment