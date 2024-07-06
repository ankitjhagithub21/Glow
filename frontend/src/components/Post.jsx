import React from 'react';
import { FaRegHeart, FaRegComment, FaRegBookmark, FaRegTrashAlt } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { formatDistanceToNow } from 'date-fns';

const Post = ({ post }) => {
    const formattedDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

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
                    <span className='text-sm'>{post.user.username}</span>
                </div>
            </div>
            <p className='mt-2'>{post.title ? post.title : ''}</p>
            <img src={post.image.url} alt="post" className='h-54 my-3 rounded-lg' />
            <div className='flex items-center justify-between'>
                <button>
                    <FaRegHeart />
                </button>
                <button>
                    <FaRegComment />
                </button>
                <button>
                    <FaRegTrashAlt />
                </button>
                <button>
                    <FaRegBookmark />
                </button>
            </div>
        </div>
    );
}

export default Post;
