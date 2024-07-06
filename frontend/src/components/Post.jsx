import React from 'react';
import { FaRegHeart, FaRegComment, FaRegBookmark, FaRegTrashAlt } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { formatDistanceToNow } from 'date-fns';
import {useSelector} from "react-redux"

const Post = ({ post, handleDelete ,handleLikeUnlike}) => {
    const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });
    const currUser = useSelector(state=>state.auth.user)
   
    return (
        <div className='w-full flex flex-col p-3 border-b'>
            <div className='flex items-center gap-1'>
                <img src={post.user.profileImg} alt="user" className='w-10 rounded-full' />
                <div className='flex flex-col items-start'>
                    <div className='flex items-center gap-1 text-sm'>
                        <span>{post.user.fullName}</span>
                        <LuDot />
                        <span>{formattedDate}</span>
                    </div>
                    <span className='text-sm'>@{post.user.username}</span>
                </div>
            </div>
            <p className='mt-2'>{post?.title}</p>
            <img src={post.image.url} alt="post" className='h-54 my-3 rounded-lg' />
            <div className='flex items-center justify-between'>
                <button className='flex items-center gap-1' onClick={()=>handleLikeUnlike(post._id)}>
                    <span className='text-lg'>{post.likes.length}</span>
                    <FaRegHeart />
                </button>
                <button>
                    <FaRegComment />
                </button>
                {
                    post.user._id === currUser._id && <button onClick={()=>handleDelete(post._id)}>
                    <FaRegTrashAlt />
                </button> 
                }
                <button>
                    <FaRegBookmark />
                </button>
            </div>
        </div>
    );
}

export default Post;
